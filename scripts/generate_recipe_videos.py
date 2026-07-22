#!/usr/bin/env python3
import json, math, re, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "videos"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1280, 720
CREAM, PAPER, INK, COPPER, OLIVE, GOLD = "#f7eedc", "#fffaf0", "#252118", "#a44220", "#4f5941", "#d9903f"
SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SERIF_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANS_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

def font(path, size): return ImageFont.truetype(path, size)

def load_recipes():
    source = (ROOT / "app" / "data" / "recipes.ts").read_text()
    source = re.sub(r"export type Recipe = \{[\s\S]*?\};\n", "", source)
    source = source.replace("export const ", "const ")
    source = source.replace("const commonSteps = (dish: string)", "const commonSteps = (dish)")
    source = source.replace("const featuredRecipes: Recipe[]", "const featuredRecipes")
    source = source.replace("const signatureDishes: Record<string,string>", "const signatureDishes")
    source = source.replace("const slugify=(value:string)", "const slugify=(value)")
    source = source.replace("const generatedRecipes:Recipe[]", "const generatedRecipes")
    source = source.replace("const recipes:Recipe[]", "const recipes")
    source = re.sub(r"const recipeBySlug[\s\S]*$", "", source)
    command = source + "; console.log(JSON.stringify(recipes.slice(0,45)))"
    result = subprocess.run(["node", "-e", command], check=True, capture_output=True, text=True)
    return json.loads(result.stdout)

def wrap(draw, text, face, max_width):
    words, lines, current = text.split(), [], ""
    for word in words:
        test = (current + " " + word).strip()
        if draw.textbbox((0,0), test, font=face)[2] <= max_width: current = test
        else:
            if current: lines.append(current)
            current = word
    if current: lines.append(current)
    return lines

def base_slide(recipe, section, number):
    img = Image.new("RGB", (W,H), CREAM); d = ImageDraw.Draw(img)
    d.rectangle((0,0,W,16), fill=COPPER); d.rectangle((0,H-14,W,H), fill=OLIVE)
    for x in range(30, 430, 54):
        d.polygon([(x,30),(x+24,54),(x,78),(x-24,54)], outline=GOLD, width=3)
    d.text((70,105), "THE COPPER SPOON", font=font(SANS_BOLD,22), fill=COPPER)
    d.text((70,145), f"{recipe['cuisine']}  •  {recipe['time']}  •  Serves {recipe['servings']}", font=font(SANS,20), fill=OLIVE)
    d.rounded_rectangle((70,205,W-70,H-70), radius=24, fill=PAPER, outline="#dfd0b8", width=2)
    d.text((102,234), section.upper(), font=font(SANS_BOLD,17), fill=COPPER)
    d.text((W-135,230), f"{number}/7", font=font(SANS_BOLD,17), fill=OLIVE)
    return img, d

def title_slide(recipe):
    img = Image.new("RGB", (W,H), OLIVE); d = ImageDraw.Draw(img)
    for x in range(-40,W,85):
        d.polygon([(x,30),(x+35,65),(x,100),(x-35,65)], outline=GOLD, width=4)
        d.polygon([(x,H-100),(x+35,H-65),(x,H-30),(x-35,H-65)], outline=GOLD, width=4)
    d.rounded_rectangle((105,125,W-105,H-125), radius=35, fill=CREAM, outline=GOLD, width=4)
    d.text((W//2,178), "THE COPPER SPOON", anchor="mm", font=font(SANS_BOLD,22), fill=COPPER)
    d.text((W//2,230), "COOKING LESSON", anchor="mm", font=font(SANS,18), fill=OLIVE)
    lines = wrap(d, recipe["title"], font(SERIF_BOLD,62), 930)
    y = 300 - (len(lines)-1)*37
    for line in lines:
        d.text((W//2,y), line, anchor="mm", font=font(SERIF_BOLD,62), fill=INK); y += 76
    d.text((W//2,520), f"{recipe['flag']}  {recipe['cuisine']}  •  {recipe['difficulty']}  •  {recipe['time']}", anchor="mm", font=font(SANS_BOLD,20), fill=COPPER)
    d.text((W//2,575), "Ingredients • Method • Chef's tip", anchor="mm", font=font(SANS,18), fill=OLIVE)
    return img

def list_slide(recipe, heading, items, number, numbered=False):
    img,d = base_slide(recipe, heading, number); y=285
    for i,item in enumerate(items):
        marker = f"{i+1}." if numbered else "•"
        d.text((115,y), marker, font=font(SANS_BOLD,24), fill=COPPER)
        lines=wrap(d,item,font(SANS,23),1000)
        for line in lines:
            d.text((160,y),line,font=font(SANS,23),fill=INK); y+=33
        y+=15
    return img

def tip_slide(recipe):
    img,d=base_slide(recipe,"Chef's tip",7)
    d.ellipse((110,300,210,400),fill=COPPER); d.text((160,350),"✦",anchor="mm",font=font(SERIF_BOLD,38),fill=CREAM)
    y=300
    for line in wrap(d,recipe["tip"],font(SERIF,31),850):
        d.text((255,y),line,font=font(SERIF,31),fill=INK); y+=45
    d.text((255,510),"Save this lesson and cook with confidence.",font=font(SANS_BOLD,19),fill=OLIVE)
    return img

def mixing_frame(recipe, frame_index, frame_count):
    img,d=base_slide(recipe,"Mix it together",4)
    cx,cy=690,475
    d.ellipse((365,370,1015,650),fill="#d8a05f",outline=COPPER,width=8)
    d.ellipse((395,385,985,560),fill="#fff2d2",outline=INK,width=5)
    d.ellipse((440,420,940,540),fill="#dc7a38")
    phase=frame_index/frame_count*math.tau*3
    spoon_x=cx+int(math.cos(phase)*155); spoon_y=cy+int(math.sin(phase)*55)
    d.line((spoon_x,spoon_y,spoon_x+185,spoon_y-205),fill="#7c3f1f",width=25)
    d.ellipse((spoon_x-42,spoon_y-22,spoon_x+42,spoon_y+22),fill=GOLD,outline=COPPER,width=4)
    colors=["#e4532f","#77a557","#f0bd55","#f7e4b8","#a64128"]
    for i in range(22):
        angle=phase+i*1.73; radius=45+(i%5)*30
        x=cx+int(math.cos(angle)*radius); y=cy+int(math.sin(angle)*radius*.35)
        d.ellipse((x-10,y-7,x+10,y+7),fill=colors[i%len(colors)])
    ingredient=recipe["ingredients"][frame_index%len(recipe["ingredients"])]
    label=wrap(d,ingredient,font(SANS_BOLD,21),255)[0]
    d.rounded_rectangle((85,340,345,455),radius=18,fill=OLIVE)
    d.text((215,373),"ADDING",anchor="mm",font=font(SANS_BOLD,14),fill=CREAM)
    d.text((215,415),label,anchor="mm",font=font(SANS_BOLD,21),fill="#fff4dd")
    d.text((W//2,665),"Fold, stir and combine until every flavour comes together.",anchor="mm",font=font(SANS_BOLD,18),fill=OLIVE)
    return img

def narration(recipe):
    ingredients=". ".join(recipe["ingredients"])
    steps=". ".join(recipe["steps"])
    return f"Welcome to The Copper Spoon. Today we are making {recipe['title']}, a {recipe['cuisine']} favourite. You will need: {ingredients}. Now let us cook. {steps}. Chef's tip: {recipe['tip']}. Take your time, taste as you go, and enjoy your {recipe['title']}."

def make_video(recipe):
    ingredients=recipe["ingredients"]
    steps=recipe["steps"]
    slides=[title_slide(recipe),list_slide(recipe,"Ingredients",ingredients[:4],2),list_slide(recipe,"More ingredients",ingredients[4:] or ["Salt and seasoning to taste"],3),list_slide(recipe,"Method",steps[:2],5,True),list_slide(recipe,"Finish the dish",steps[2:] or ["Taste, garnish and serve warm."],6,True),tip_slide(recipe)]
    with tempfile.TemporaryDirectory() as tmp:
        tmp=Path(tmp); durations=[12,22,18,18,22,18,10]
        slide_paths=[]
        for i,slide in enumerate(slides):
            path=tmp/f"slide-{i}.png"; slide.save(path,optimize=True); slide_paths.append(path)
        mix_dir=tmp/"mix"; mix_dir.mkdir(); mix_entries=[]; mix_count=24
        for i in range(mix_count):
            path=mix_dir/f"frame-{i:03d}.png"; mixing_frame(recipe,i,mix_count).save(path,optimize=True)
            mix_entries.extend([f"file '{path}'","duration 0.75"])
        mix_entries.append(f"file '{mix_dir / f'frame-{mix_count-1:03d}.png'}'")
        mix_list=tmp/"mix.txt"; mix_list.write_text("\n".join(mix_entries))
        mix_video=tmp/"mix.mp4"
        subprocess.run(["ffmpeg","-loglevel","error","-y","-f","concat","-safe","0","-i",str(mix_list),"-vf","fps=12,scale=1920:1080:flags=lanczos,format=yuv420p","-c:v","libx264","-preset","fast","-crf","25","-an",str(mix_video)],check=True)
        voice_file=tmp/"narration.txt"; voice_file.write_text(narration(recipe))
        visual_inputs=[slide_paths[0],slide_paths[1],slide_paths[2],mix_video,slide_paths[3],slide_paths[4],slide_paths[5]]
        command=["ffmpeg","-loglevel","error","-y"]
        for i,(path,duration) in enumerate(zip(visual_inputs,durations)):
            if i==3: command += ["-i",str(path)]
            else: command += ["-loop","1","-t",str(duration),"-i",str(path)]
        command += ["-f","lavfi","-i",f"flite=textfile={voice_file}:voice=slt"]
        video_filters=[]
        for i,duration in enumerate(durations):
            if i==3: video_filters.append(f"[{i}:v]scale=1920:1080:flags=lanczos,fps=12,trim=duration={duration},setpts=PTS-STARTPTS,setsar=1,format=yuv420p[v{i}]")
            else: video_filters.append(f"[{i}:v]scale=1920:1080:flags=lanczos,zoompan=z='min(zoom+0.00012,1.035)':d=1:s=1920x1080:fps=12,trim=duration={duration},setpts=PTS-STARTPTS,setsar=1,format=yuv420p[v{i}]")
        joined="".join(f"[v{i}]" for i in range(7))
        video_filters.append(f"{joined}concat=n=7:v=1:a=0[vout]")
        video_filters.append("[7:a]volume=1.8,highpass=f=90,lowpass=f=8500,acompressor=threshold=0.12:ratio=3:attack=20:release=250,apad,atrim=0:120,loudnorm=I=-16:TP=-1.5:LRA=11[aout]")
        output=OUT/f"{recipe['slug']}.mp4"
        command += ["-filter_complex",";".join(video_filters),"-map","[vout]","-map","[aout]","-t","120","-c:v","libx264","-preset","fast","-crf","26","-c:a","aac","-b:a","128k","-movflags","+faststart",str(output)]
        subprocess.run(command,check=True)
    return output

def main():
    recipes=load_recipes(); print(f"Generating {len(recipes)} videos")
    for index,recipe in enumerate(recipes,1):
        output=make_video(recipe); print(f"{index:02d}/{len(recipes)} {output.name} {output.stat().st_size}")

if __name__=="__main__": main()
