import type { Recipe } from "./recipes";

export type DessertRecipe = Recipe & {
  region: "Africa" | "Europe" | "Asia" | "Middle East" | "Americas";
  category: "Cake" | "Pastry" | "Pudding" | "Fried" | "Frozen" | "Confection";
};

type DessertSeed = {
  title: string;
  country: string;
  flag: string;
  region: DessertRecipe["region"];
  category: DessertRecipe["category"];
  time: string;
  difficulty: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tip: string;
};

const dessertPhotos = [
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=1200&q=88",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=88",
];

const seeds: DessertSeed[] = [
  {
    title: "Nigerian Puff-Puff", country: "Nigeria", flag: "🇳🇬", region: "Africa", category: "Fried", time: "1 hr 15", difficulty: "Easy",
    description: "Soft, airy West African dough bites with a golden crust and a whisper of nutmeg.",
    ingredients: ["500g plain flour", "100g sugar", "7g instant yeast", "½ teaspoon nutmeg", "420ml warm water", "Vegetable oil for frying"],
    steps: ["Whisk flour, sugar, yeast and nutmeg in a large bowl.", "Add warm water gradually and beat until the batter is smooth and stretchy.", "Cover and leave in a warm place for 45 minutes, until doubled and bubbly.", "Heat oil to 170°C and carefully drop in rounded spoonfuls of batter.", "Fry for 4–5 minutes, turning until evenly golden; drain and serve warm."],
    tip: "Wet the spoon between scoops so the batter slides cleanly into the oil."
  },
  {
    title: "Coconut Chin Chin", country: "Nigeria", flag: "🇳🇬", region: "Africa", category: "Fried", time: "55 min", difficulty: "Easy",
    description: "Crisp, bite-sized coconut biscuits fried until golden and perfect for sharing.",
    ingredients: ["500g plain flour", "100g sugar", "80g butter", "120ml coconut milk", "1 egg", "½ teaspoon nutmeg", "Oil for frying"],
    steps: ["Rub butter into the flour, sugar and nutmeg until sandy.", "Mix in the egg and coconut milk to form a firm dough; rest for 10 minutes.", "Roll the dough 5mm thick and cut it into small diamonds.", "Fry in 170°C oil in batches for 4 minutes until crisp and golden.", "Drain completely and cool before storing."],
    tip: "Keep the pieces evenly sized so they become crisp at the same time."
  },
  {
    title: "Malva Pudding", country: "South Africa", flag: "🇿🇦", region: "Africa", category: "Pudding", time: "55 min", difficulty: "Easy",
    description: "A warm apricot sponge soaked in a rich cream-and-butter sauce.",
    ingredients: ["180g plain flour", "150g sugar", "1 egg", "1 tablespoon apricot jam", "250ml milk", "100ml cream", "80g butter"],
    steps: ["Heat the oven to 180°C and butter a 20cm baking dish.", "Beat sugar, egg and apricot jam, then fold in flour and milk.", "Bake for 30–35 minutes until deeply golden and springy.", "Warm cream, butter and 60g extra sugar until smooth.", "Pour the hot sauce over the pudding and rest for 10 minutes before serving."],
    tip: "Pour the sauce on while the sponge is hot so it absorbs every drop."
  },
  {
    title: "Cape Koeksisters", country: "South Africa", flag: "🇿🇦", region: "Africa", category: "Fried", time: "1 hr 30", difficulty: "Medium",
    description: "Braided fried pastries plunged into icy cinnamon-lemon syrup.",
    ingredients: ["400g plain flour", "10g baking powder", "50g butter", "180ml milk", "400g sugar", "300ml water", "Cinnamon and lemon peel"],
    steps: ["Simmer sugar, water, cinnamon and lemon peel for 8 minutes, then chill the syrup completely.", "Rub butter into flour and baking powder; add milk to make a soft dough.", "Rest 20 minutes, roll, cut strips and braid each strip.", "Fry at 170°C for 4–5 minutes until golden.", "Move each hot braid straight into the ice-cold syrup, soak briefly and drain."],
    tip: "The contrast between hot pastry and cold syrup creates the glossy, crisp finish."
  },
  {
    title: "Egyptian Basbousa", country: "Egypt", flag: "🇪🇬", region: "Africa", category: "Cake", time: "50 min", difficulty: "Easy",
    description: "Tender semolina cake scented with coconut and soaked in lemon syrup.",
    ingredients: ["300g fine semolina", "100g desiccated coconut", "150g sugar", "250g yoghurt", "120g melted butter", "Almonds", "Lemon syrup"],
    steps: ["Heat the oven to 180°C and butter a 23cm square tin.", "Mix semolina, coconut, sugar, yoghurt and melted butter.", "Spread into the tin, score diamonds and press an almond into each piece.", "Bake for 30–35 minutes until golden.", "Pour cool lemon syrup over the hot cake and rest for 30 minutes."],
    tip: "Do not overmix; a gentle stir keeps the semolina crumb tender."
  },
  {
    title: "Umm Ali", country: "Egypt", flag: "🇪🇬", region: "Africa", category: "Pudding", time: "40 min", difficulty: "Easy",
    description: "Flaky pastry baked with creamy milk, raisins, coconut and toasted nuts.",
    ingredients: ["300g baked puff pastry", "750ml whole milk", "150ml cream", "80g sugar", "50g raisins", "60g mixed nuts", "30g coconut"],
    steps: ["Heat the oven to 200°C and tear the pastry into a baking dish.", "Scatter raisins, coconut and half the nuts between the pastry pieces.", "Warm milk, cream and sugar until steaming, then pour over the dish.", "Top with the remaining nuts and bake for 15–18 minutes until bubbling.", "Rest for 5 minutes and serve warm."],
    tip: "Keep some pastry edges above the milk so they stay beautifully crisp."
  },
  {
    title: "Date Makroud", country: "Tunisia", flag: "🇹🇳", region: "Africa", category: "Fried", time: "1 hr 10", difficulty: "Medium",
    description: "Diamond-shaped semolina pastries filled with spiced dates and glazed with honey.",
    ingredients: ["400g semolina", "120g melted butter", "160ml warm water", "250g date paste", "½ teaspoon cinnamon", "Orange-blossom honey", "Oil for frying"],
    steps: ["Mix semolina and butter, then add water gradually to form a pliable dough.", "Knead cinnamon into the date paste and roll it into thin ropes.", "Wrap dough around each date rope, flatten slightly and cut diamonds.", "Fry at 170°C until amber and crisp.", "Dip the warm pastries in orange-blossom honey and drain."],
    tip: "Seal the dough firmly around the dates so the filling stays inside while frying."
  },
  {
    title: "Moroccan Orange Meskouta", country: "Morocco", flag: "🇲🇦", region: "Africa", category: "Cake", time: "55 min", difficulty: "Easy",
    description: "A light orange cake perfumed with fresh zest and blossom water.",
    ingredients: ["250g plain flour", "180g sugar", "3 eggs", "120ml orange juice", "100ml vegetable oil", "Orange zest", "1 teaspoon orange-blossom water"],
    steps: ["Heat the oven to 175°C and line a 22cm round tin.", "Whisk eggs and sugar until pale, then add oil, juice, zest and blossom water.", "Fold in flour and 2 teaspoons baking powder until just smooth.", "Bake for 35–40 minutes until a skewer comes out clean.", "Cool for 15 minutes and dust lightly with icing sugar."],
    tip: "Finely grate only the orange skin; the white pith can make the cake bitter."
  },
  {
    title: "Senegalese Thiakry", country: "Senegal", flag: "🇸🇳", region: "Africa", category: "Pudding", time: "35 min", difficulty: "Easy",
    description: "Cool, creamy millet pudding with vanilla, nutmeg and sweet dried fruit.",
    ingredients: ["200g millet couscous", "400g natural yoghurt", "150ml evaporated milk", "80g sugar", "½ teaspoon nutmeg", "1 teaspoon vanilla", "50g raisins"],
    steps: ["Steam or prepare the millet couscous according to its packet and cool fully.", "Whisk yoghurt, evaporated milk, sugar, nutmeg and vanilla.", "Fold the cooled millet and raisins into the yoghurt mixture.", "Chill for at least 20 minutes.", "Stir once more and serve in cold bowls."],
    tip: "Cool the millet completely before adding dairy so the yoghurt remains thick."
  },
  {
    title: "Classic Tiramisu", country: "Italy", flag: "🇮🇹", region: "Europe", category: "Pudding", time: "30 min + chill", difficulty: "Medium",
    description: "Espresso-soaked ladyfingers layered with silky mascarpone cream and cocoa.",
    ingredients: ["300g ladyfingers", "350ml strong espresso", "500g mascarpone", "4 pasteurised eggs", "100g sugar", "Unsweetened cocoa"],
    steps: ["Whisk egg yolks and sugar until thick, then beat in mascarpone.", "Whisk the egg whites to soft peaks and fold gently into the cream.", "Dip each ladyfinger briefly in cooled espresso and arrange in a dish.", "Layer with mascarpone cream, repeat, and smooth the top.", "Chill for 6 hours and dust generously with cocoa before serving."],
    tip: "A quick dip is enough—over-soaking makes the layers collapse."
  },
  {
    title: "Vanilla Panna Cotta", country: "Italy", flag: "🇮🇹", region: "Europe", category: "Pudding", time: "20 min + chill", difficulty: "Easy",
    description: "Silky vanilla-set cream served with bright seasonal berries.",
    ingredients: ["500ml double cream", "80g sugar", "1 vanilla pod", "3 gelatine leaves", "Fresh berries", "1 teaspoon lemon juice"],
    steps: ["Soak gelatine leaves in cold water for 5 minutes.", "Warm cream, sugar and vanilla until steaming but not boiling.", "Squeeze the gelatine dry and stir it into the hot cream.", "Pour into six moulds and chill for at least 4 hours.", "Turn out and spoon over berries tossed with lemon juice."],
    tip: "Lightly oil the moulds with neutral oil for an easy, clean release."
  },
  {
    title: "Crème Brûlée", country: "France", flag: "🇫🇷", region: "Europe", category: "Pudding", time: "1 hr + chill", difficulty: "Medium",
    description: "Vanilla baked custard beneath a glassy layer of caramelised sugar.",
    ingredients: ["500ml double cream", "5 egg yolks", "80g caster sugar", "1 vanilla pod", "6 teaspoons demerara sugar"],
    steps: ["Heat the oven to 150°C and place six ramekins in a deep roasting tin.", "Warm cream and vanilla; whisk yolks with caster sugar, then slowly whisk in the cream.", "Strain into ramekins and add hot water halfway up their sides.", "Bake 30–35 minutes until the centres still wobble; cool and chill.", "Scatter demerara sugar over each custard and caramelise with a kitchen torch."],
    tip: "Keep the torch moving to melt the sugar evenly without warming the custard."
  },
  {
    title: "Raspberry Macarons", country: "France", flag: "🇫🇷", region: "Europe", category: "Confection", time: "1 hr 30", difficulty: "Advanced",
    description: "Delicate almond shells filled with bright raspberry buttercream.",
    ingredients: ["110g ground almonds", "200g icing sugar", "100g egg whites", "50g caster sugar", "Pink food colouring", "Raspberry buttercream"],
    steps: ["Sift ground almonds and icing sugar together twice.", "Whisk egg whites, adding caster sugar gradually, until glossy stiff peaks form.", "Fold in the almond mixture and colour until the batter flows in a slow ribbon.", "Pipe rounds, rest 30 minutes, then bake at 150°C for 14–16 minutes.", "Cool completely and sandwich matching shells with raspberry buttercream."],
    tip: "Weigh every ingredient precisely; macarons reward accuracy."
  },
  {
    title: "Pastéis de Nata", country: "Portugal", flag: "🇵🇹", region: "Europe", category: "Pastry", time: "55 min", difficulty: "Medium",
    description: "Crisp laminated pastry cups filled with caramel-spotted lemon custard.",
    ingredients: ["375g all-butter puff pastry", "300ml whole milk", "150g sugar", "6 egg yolks", "25g cornflour", "Lemon peel", "Cinnamon"],
    steps: ["Heat the oven to 240°C and press pastry spirals into a greased muffin tin.", "Whisk a little milk with cornflour and yolks.", "Warm remaining milk with sugar, lemon peel and cinnamon, then whisk into the yolks.", "Fill pastry cups three-quarters full and bake 14–16 minutes until blistered.", "Cool briefly and serve with cinnamon."],
    tip: "A very hot oven gives the custard its signature dark spots."
  },
  {
    title: "Spanish Churros", country: "Spain", flag: "🇪🇸", region: "Europe", category: "Fried", time: "35 min", difficulty: "Easy",
    description: "Ridged, crisp dough sticks rolled in cinnamon sugar with chocolate sauce.",
    ingredients: ["250ml water", "150g plain flour", "25g butter", "1 tablespoon sugar", "Cinnamon sugar", "Oil for frying", "Chocolate sauce"],
    steps: ["Bring water, butter and sugar to a boil; beat in flour until a smooth dough forms.", "Transfer to a strong piping bag fitted with a star nozzle.", "Pipe short lengths carefully into 175°C oil.", "Fry for 3–4 minutes until crisp and golden, then drain.", "Roll in cinnamon sugar and serve immediately with warm chocolate."],
    tip: "Use a sturdy piping bag—the dough is thicker than cake icing."
  },
  {
    title: "Honey Pistachio Baklava", country: "Greece", flag: "🇬🇷", region: "Europe", category: "Pastry", time: "1 hr 20", difficulty: "Medium",
    description: "Shattering filo layers packed with pistachios and soaked in citrus honey syrup.",
    ingredients: ["16 filo sheets", "250g pistachios", "180g melted butter", "180g honey", "120g sugar", "150ml water", "Lemon peel"],
    steps: ["Heat the oven to 175°C and butter a rectangular baking tin.", "Layer filo sheets, brushing every sheet with butter and adding pistachios between groups.", "Cut diamonds before baking for 40–45 minutes until deeply golden.", "Simmer honey, sugar, water and lemon peel for 8 minutes.", "Pour cool syrup over hot baklava and rest for at least 4 hours."],
    tip: "Keep unused filo covered with a damp tea towel so it does not crack."
  },
  {
    title: "Black Forest Gateau", country: "Germany", flag: "🇩🇪", region: "Europe", category: "Cake", time: "1 hr 30", difficulty: "Medium",
    description: "Chocolate sponge layered with cherries, cream and dark chocolate curls.",
    ingredients: ["220g plain flour", "60g cocoa powder", "250g sugar", "4 eggs", "300ml whipping cream", "300g cherries", "Dark chocolate"],
    steps: ["Heat the oven to 175°C and line two 20cm cake tins.", "Whisk eggs and sugar until thick, then fold in flour and cocoa.", "Bake 25–30 minutes, cool fully and split each cake into layers.", "Layer sponge with cherry syrup, whipped cream and cherries.", "Cover with cream, chocolate curls and extra cherries; chill before slicing."],
    tip: "Cold cake layers are easier to split and assemble neatly."
  },
  {
    title: "Viennese Apple Strudel", country: "Austria", flag: "🇦🇹", region: "Europe", category: "Pastry", time: "1 hr 10", difficulty: "Medium",
    description: "Paper-thin pastry rolled around cinnamon apples, raisins and toasted crumbs.",
    ingredients: ["6 filo sheets", "5 tart apples", "80g sugar", "60g raisins", "1 teaspoon cinnamon", "70g breadcrumbs", "80g melted butter"],
    steps: ["Heat the oven to 190°C and toss sliced apples with sugar, raisins and cinnamon.", "Toast breadcrumbs in a spoon of butter until golden.", "Layer filo with melted butter, then scatter over the crumbs and apple mixture.", "Roll firmly, tuck in the ends and brush with more butter.", "Bake 35–40 minutes until crisp; rest 15 minutes before dusting with sugar."],
    tip: "Breadcrumbs absorb apple juice and keep the pastry base crisp."
  },
  {
    title: "Sticky Toffee Pudding", country: "United Kingdom", flag: "🇬🇧", region: "Europe", category: "Pudding", time: "55 min", difficulty: "Easy",
    description: "Warm date sponge drenched in glossy brown-sugar toffee sauce.",
    ingredients: ["200g pitted dates", "200ml boiling water", "180g self-raising flour", "150g brown sugar", "2 eggs", "100g butter", "200ml cream"],
    steps: ["Heat the oven to 180°C and soak chopped dates in boiling water for 10 minutes.", "Cream 60g butter with 100g sugar, beat in eggs, then fold in flour and dates.", "Bake in a greased dish for 30–35 minutes.", "Simmer remaining butter and sugar with cream for 5 minutes.", "Pour some sauce over the hot sponge and serve the rest alongside."],
    tip: "Blend half the soaked dates for an especially moist sponge."
  },
  {
    title: "Brussels Waffles", country: "Belgium", flag: "🇧🇪", region: "Europe", category: "Pastry", time: "35 min", difficulty: "Easy",
    description: "Tall, crisp-edged waffles with a light centre, berries and warm chocolate.",
    ingredients: ["250g plain flour", "2 teaspoons baking powder", "2 eggs, separated", "350ml milk", "100g melted butter", "1 tablespoon sugar", "Berries and chocolate"],
    steps: ["Preheat the waffle iron and whisk flour, baking powder and sugar.", "Mix yolks, milk and melted butter, then stir into the dry ingredients.", "Whisk egg whites to soft peaks and fold them gently into the batter.", "Cook ladlefuls in the waffle iron until crisp and golden.", "Serve immediately with berries and warm chocolate."],
    tip: "Folding in whipped egg whites creates the classic airy interior."
  },
  {
    title: "Swedish Cinnamon Buns", country: "Sweden", flag: "🇸🇪", region: "Europe", category: "Pastry", time: "2 hr", difficulty: "Medium",
    description: "Cardamom-scented buns swirled with cinnamon butter and pearl sugar.",
    ingredients: ["500g strong flour", "7g yeast", "250ml warm milk", "100g butter", "80g sugar", "2 teaspoons cinnamon", "1 teaspoon cardamom"],
    steps: ["Mix flour, yeast, milk, 50g butter, 40g sugar and cardamom; knead until smooth.", "Cover and prove for 60 minutes until doubled.", "Roll out, spread with remaining butter and cinnamon sugar, then roll and slice.", "Prove 25 minutes, brush with egg and scatter with pearl sugar.", "Bake at 200°C for 10–12 minutes until golden."],
    tip: "Do not overbake; the centres should remain soft and fragrant."
  },
  {
    title: "Polish Sernik", country: "Poland", flag: "🇵🇱", region: "Europe", category: "Cake", time: "1 hr 30", difficulty: "Medium",
    description: "Rich Polish cheesecake made with soft curd cheese and lemon.",
    ingredients: ["750g twaróg or ricotta", "180g sugar", "4 eggs", "100g butter", "2 tablespoons cornflour", "Lemon zest", "1 teaspoon vanilla"],
    steps: ["Heat the oven to 165°C and line a 22cm springform tin.", "Beat cheese, sugar, butter, cornflour, lemon zest and vanilla until smooth.", "Add eggs one at a time on low speed.", "Bake for 55–65 minutes until set at the edge with a slight centre wobble.", "Cool in the switched-off oven with the door ajar, then chill."],
    tip: "Room-temperature ingredients combine smoothly without overbeating."
  },
  {
    title: "Russian Honey Cake", country: "Russia", flag: "🇷🇺", region: "Europe", category: "Cake", time: "2 hr", difficulty: "Advanced",
    description: "Fine caramel-honey layers softened overnight with tangy cream filling.",
    ingredients: ["450g plain flour", "180g honey", "180g sugar", "120g butter", "3 eggs", "600ml sour cream", "100g icing sugar"],
    steps: ["Warm honey, sugar and butter until melted; cool slightly and whisk in eggs.", "Mix in flour to form a soft dough and divide into eight pieces.", "Roll each piece thin and bake at 180°C for 5–6 minutes.", "Whisk sour cream with icing sugar and layer it between the cooled rounds.", "Coat with cake crumbs and chill overnight before slicing."],
    tip: "The overnight rest transforms the crisp layers into a tender cake."
  },
  {
    title: "Danish Risalamande", country: "Denmark", flag: "🇩🇰", region: "Europe", category: "Pudding", time: "50 min + chill", difficulty: "Easy",
    description: "Vanilla rice pudding folded with cream and almonds, served with cherry sauce.",
    ingredients: ["180g short-grain rice", "1 litre whole milk", "1 vanilla pod", "70g sugar", "300ml whipping cream", "80g chopped almonds", "Cherry sauce"],
    steps: ["Simmer rice, milk and vanilla gently for 35 minutes, stirring often.", "Stir in sugar and cool the rice pudding completely.", "Whip cream to soft peaks and fold it into the cold pudding with almonds.", "Chill for at least 2 hours.", "Spoon into bowls and finish with warm cherry sauce."],
    tip: "Stir frequently near the end so the milk does not catch on the pan."
  },
  {
    title: "Strawberry Daifuku Mochi", country: "Japan", flag: "🇯🇵", region: "Asia", category: "Confection", time: "45 min", difficulty: "Medium",
    description: "Soft rice-flour parcels wrapped around sweet bean paste and fresh strawberries.",
    ingredients: ["150g glutinous rice flour", "60g sugar", "200ml water", "Cornflour for dusting", "250g sweet red-bean paste", "8 strawberries"],
    steps: ["Wrap each dry strawberry in a thin layer of red-bean paste.", "Whisk rice flour, sugar and water in a microwave-safe bowl.", "Microwave in short bursts, stirring, until the dough is translucent and stretchy.", "Turn onto cornflour, divide into eight pieces and flatten carefully.", "Wrap each piece around a prepared strawberry and pinch closed."],
    tip: "Use plenty of cornflour on your hands—the cooked mochi is very sticky."
  },
  {
    title: "Matcha Cheesecake", country: "Japan", flag: "🇯🇵", region: "Asia", category: "Cake", time: "1 hr 20", difficulty: "Medium",
    description: "Creamy baked cheesecake balanced with the gentle bitterness of matcha.",
    ingredients: ["200g biscuit crumbs", "80g butter", "600g cream cheese", "160g sugar", "3 eggs", "200ml sour cream", "2 tablespoons matcha"],
    steps: ["Heat the oven to 160°C and press buttered biscuit crumbs into a springform tin.", "Beat cream cheese and sugar smooth, then mix in matcha and sour cream.", "Add eggs one at a time on low speed.", "Bake for 50–55 minutes until the centre has a gentle wobble.", "Cool gradually, chill for 6 hours and dust lightly with matcha."],
    tip: "Sift matcha before mixing to prevent green speckles and lumps."
  },
  {
    title: "Mango Sticky Rice", country: "Thailand", flag: "🇹🇭", region: "Asia", category: "Pudding", time: "50 min", difficulty: "Easy",
    description: "Coconut-glazed sticky rice with ripe mango and toasted sesame.",
    ingredients: ["300g glutinous rice", "400ml coconut milk", "100g sugar", "½ teaspoon salt", "2 ripe mangoes", "Toasted sesame seeds"],
    steps: ["Soak the rice for at least 3 hours, then steam it for 25 minutes.", "Warm coconut milk with sugar and salt until dissolved.", "Pour two-thirds over the hot rice, cover and rest for 20 minutes.", "Slice the mangoes and divide the rice between plates.", "Spoon over remaining coconut sauce and scatter with sesame."],
    tip: "Use ripe, fragrant mangoes—the fruit should give slightly when pressed."
  },
  {
    title: "Vietnamese Coconut Tapioca", country: "Vietnam", flag: "🇻🇳", region: "Asia", category: "Pudding", time: "35 min", difficulty: "Easy",
    description: "Pearl tapioca simmered in coconut milk with banana and toasted peanuts.",
    ingredients: ["100g small tapioca pearls", "400ml coconut milk", "250ml water", "70g sugar", "3 bananas", "Pinch of salt", "Toasted peanuts"],
    steps: ["Soak tapioca pearls in cool water for 15 minutes and drain.", "Simmer coconut milk, water, sugar and salt.", "Add tapioca and cook gently for 12–15 minutes until mostly translucent.", "Fold in sliced bananas and cook for 3 minutes more.", "Serve warm or chilled with toasted peanuts."],
    tip: "Stir often because tapioca pearls settle quickly on the base of the pan."
  },
  {
    title: "Gulab Jamun", country: "India", flag: "🇮🇳", region: "Asia", category: "Fried", time: "1 hr", difficulty: "Medium",
    description: "Tender milk dumplings soaked in rose, cardamom and saffron syrup.",
    ingredients: ["200g milk powder", "50g plain flour", "½ teaspoon baking powder", "80ml milk", "30g ghee", "300g sugar", "Cardamom and rose water"],
    steps: ["Simmer sugar with 300ml water, cardamom and rose water for 6 minutes; keep warm.", "Mix milk powder, flour and baking powder, then add ghee and enough milk for a soft dough.", "Rest 10 minutes and roll into smooth, crack-free balls.", "Fry slowly at 150–160°C until evenly deep golden.", "Soak in warm syrup for at least 45 minutes."],
    tip: "Low frying heat lets the centres cook before the outside becomes dark."
  },
  {
    title: "Cardamom Rice Kheer", country: "India", flag: "🇮🇳", region: "Asia", category: "Pudding", time: "55 min", difficulty: "Easy",
    description: "Slow-cooked milk pudding with rice, cardamom, saffron and nuts.",
    ingredients: ["100g basmati rice", "1 litre whole milk", "100g sugar", "6 cardamom pods", "Pinch of saffron", "40g pistachios", "40g almonds"],
    steps: ["Rinse and soak the rice for 20 minutes, then drain.", "Bring milk to a gentle simmer with cardamom and saffron.", "Add rice and cook on low for 35–40 minutes, stirring regularly.", "Add sugar and simmer until creamy but still spoonable.", "Serve warm or chilled with pistachios and almonds."],
    tip: "Scrape the milk solids from the sides of the pan back into the kheer for richness."
  },
  {
    title: "Mango Pistachio Kulfi", country: "India", flag: "🇮🇳", region: "Asia", category: "Frozen", time: "25 min + freeze", difficulty: "Easy",
    description: "Dense Indian-style mango ice cream scented with cardamom and pistachio.",
    ingredients: ["500ml evaporated milk", "250ml double cream", "250g mango purée", "100g condensed milk", "½ teaspoon cardamom", "50g pistachios"],
    steps: ["Whisk evaporated milk, cream, mango purée and condensed milk.", "Stir in cardamom and most of the chopped pistachios.", "Pour into kulfi moulds or small cups.", "Freeze for at least 6 hours until completely firm.", "Dip moulds briefly in warm water, unmould and add remaining pistachios."],
    tip: "Taste the mango first and reduce condensed milk if the fruit is very sweet."
  },
  {
    title: "Lotus Mooncakes", country: "China", flag: "🇨🇳", region: "Asia", category: "Pastry", time: "2 hr", difficulty: "Advanced",
    description: "Golden patterned pastries with smooth lotus-seed filling.",
    ingredients: ["180g plain flour", "120g golden syrup", "40g neutral oil", "½ teaspoon alkaline water", "450g lotus-seed paste", "1 egg yolk"],
    steps: ["Mix golden syrup, oil and alkaline water, then fold in flour; rest 45 minutes.", "Divide lotus paste into balls and wrap each in a thin layer of dough.", "Press into a floured mooncake mould and release onto a lined tray.", "Bake at 180°C for 6 minutes, brush lightly with egg yolk, then bake 10–12 minutes more.", "Cool and rest in an airtight box for two days before eating."],
    tip: "The resting period softens the crust and develops the classic glossy finish."
  },
  {
    title: "Hong Kong Egg Tarts", country: "Hong Kong", flag: "🇭🇰", region: "Asia", category: "Pastry", time: "55 min", difficulty: "Medium",
    description: "Buttery pastry shells filled with smooth, sunny egg custard.",
    ingredients: ["300g shortcrust pastry", "4 eggs", "180ml hot water", "100g sugar", "150ml evaporated milk", "1 teaspoon vanilla"],
    steps: ["Heat the oven to 200°C and press pastry into small tart tins.", "Dissolve sugar in hot water and leave it to cool.", "Whisk eggs, evaporated milk and vanilla, then add the syrup and strain.", "Fill shells and bake for 12 minutes; reduce to 175°C and bake 10 minutes more.", "Cool until the custard is set but still tender."],
    tip: "Straining the custard removes bubbles for a perfectly smooth surface."
  },
  {
    title: "Strawberry Bingsu", country: "South Korea", flag: "🇰🇷", region: "Asia", category: "Frozen", time: "20 min", difficulty: "Easy",
    description: "Feather-light milk snow piled with strawberries, condensed milk and mochi.",
    ingredients: ["750ml whole milk", "80ml condensed milk", "300g strawberries", "2 tablespoons sugar", "Mini mochi", "Toasted almonds"],
    steps: ["Mix milk with half the condensed milk and freeze flat in sealed bags.", "Macerate sliced strawberries with sugar for 10 minutes.", "Crush or shave the frozen milk until fine and snow-like.", "Pile into chilled bowls and top with strawberries and mini mochi.", "Drizzle with remaining condensed milk and add almonds."],
    tip: "Work quickly and chill the serving bowls so the milk snow stays fluffy."
  },
  {
    title: "Filipino Halo-Halo", country: "Philippines", flag: "🇵🇭", region: "Asia", category: "Frozen", time: "25 min", difficulty: "Easy",
    description: "A joyful layered sundae of shaved ice, fruit, beans, coconut and ube.",
    ingredients: ["4 cups shaved ice", "200ml evaporated milk", "Sweetened jackfruit", "Coconut gel", "Sweet red beans", "Ube halaya", "4 scoops ube ice cream"],
    steps: ["Divide jackfruit, coconut gel and sweet beans between tall glasses.", "Pack shaved ice over the colourful base.", "Pour evaporated milk slowly over the ice.", "Top each glass with ube halaya and a scoop of ube ice cream.", "Serve immediately with a long spoon and mix before eating."],
    tip: "Use small spoonfuls of many toppings rather than too much of one."
  },
  {
    title: "Indonesian Klepon", country: "Indonesia", flag: "🇮🇩", region: "Asia", category: "Confection", time: "40 min", difficulty: "Medium",
    description: "Pandan rice-cake balls with a molten palm-sugar centre and coconut coat.",
    ingredients: ["200g glutinous rice flour", "160ml pandan water", "120g palm sugar", "100g grated coconut", "Pinch of salt"],
    steps: ["Mix grated coconut with salt and steam it for 10 minutes.", "Add pandan water gradually to rice flour to form a soft green dough.", "Wrap small pieces of dough around palm-sugar cubes and roll smooth.", "Boil until the balls float, then cook for 1 minute more.", "Lift out, drain and roll immediately in steamed coconut."],
    tip: "Seal every ball carefully so the palm sugar melts inside instead of leaking."
  },
  {
    title: "Golden Kunafa", country: "Lebanon", flag: "🇱🇧", region: "Middle East", category: "Pastry", time: "1 hr", difficulty: "Medium",
    description: "Crisp shredded pastry around stretchy cheese, finished with orange-blossom syrup.",
    ingredients: ["400g kataifi pastry", "180g melted butter", "400g mild mozzarella", "200g ricotta", "250g sugar", "200ml water", "Orange-blossom water"],
    steps: ["Heat the oven to 190°C and toss kataifi thoroughly with melted butter.", "Press half into a buttered round tin, then add mozzarella and ricotta.", "Cover with remaining pastry and press gently.", "Bake 35–40 minutes until deeply golden.", "Turn out, pour over orange-blossom syrup and garnish with pistachios."],
    tip: "Squeeze excess moisture from the cheese to keep the pastry crisp."
  },
  {
    title: "Pistachio Ma'amoul", country: "Lebanon", flag: "🇱🇧", region: "Middle East", category: "Confection", time: "1 hr 20", difficulty: "Medium",
    description: "Buttery semolina cookies pressed into ornate moulds around pistachio filling.",
    ingredients: ["350g fine semolina", "150g plain flour", "220g butter", "80ml milk", "200g pistachios", "80g sugar", "Rose water"],
    steps: ["Rub butter into semolina and flour; rest the mixture for 30 minutes.", "Add milk and a spoon of rose water to form a soft dough.", "Mix chopped pistachios with sugar and another splash of rose water.", "Wrap dough around filling, press into a ma'amoul mould and release.", "Bake at 180°C for 15–18 minutes; cool before dusting with sugar."],
    tip: "Bake only until the bases colour lightly—the tops should remain pale."
  },
  {
    title: "Persian Saffron Ice Cream", country: "Iran", flag: "🇮🇷", region: "Middle East", category: "Frozen", time: "35 min + freeze", difficulty: "Medium",
    description: "Fragrant saffron-rose ice cream with pistachios and chewy cream pieces.",
    ingredients: ["500ml whole milk", "300ml double cream", "150g sugar", "Pinch of saffron", "1 tablespoon rose water", "60g pistachios", "1 teaspoon salep or cornflour"],
    steps: ["Bloom saffron in 2 tablespoons hot water.", "Warm milk, sugar and salep, whisking until slightly thickened.", "Add saffron, rose water and cream, then chill the mixture completely.", "Churn in an ice-cream machine and fold in chopped pistachios.", "Freeze for 4 hours, then soften for 10 minutes before scooping."],
    tip: "A little saffron goes a long way; bloom it first for even colour and aroma."
  },
  {
    title: "Rose Turkish Delight", country: "Türkiye", flag: "🇹🇷", region: "Middle East", category: "Confection", time: "1 hr + set", difficulty: "Advanced",
    description: "Soft, jewel-like rose sweets dusted generously with icing sugar.",
    ingredients: ["600g sugar", "750ml water", "120g cornflour", "1 tablespoon lemon juice", "2 teaspoons rose water", "Pink food colouring", "Icing sugar"],
    steps: ["Boil sugar, lemon juice and 250ml water to 115°C.", "Whisk cornflour with remaining water and cook until thick and translucent.", "Slowly add the hot syrup, then cook very gently for 45 minutes, stirring often.", "Add rose water and colour, pour into a lined tin and leave overnight.", "Cut into cubes and coat heavily in icing sugar mixed with cornflour."],
    tip: "Use a sugar thermometer for the dependable soft, chewy texture."
  },
  {
    title: "New York Cheesecake", country: "United States", flag: "🇺🇸", region: "Americas", category: "Cake", time: "1 hr 40", difficulty: "Medium",
    description: "Tall, dense vanilla cheesecake with a crisp biscuit base.",
    ingredients: ["250g biscuit crumbs", "100g butter", "900g cream cheese", "220g sugar", "4 eggs", "200ml sour cream", "1 teaspoon vanilla"],
    steps: ["Heat the oven to 160°C and press buttered crumbs into a springform tin.", "Beat cream cheese and sugar smooth, then mix in sour cream and vanilla.", "Add eggs one at a time at low speed and pour over the base.", "Bake 65–75 minutes until the edge is set and centre gently wobbles.", "Cool gradually, then chill overnight before slicing."],
    tip: "Avoid overbeating after adding eggs to reduce cracks."
  },
  {
    title: "Classic Apple Pie", country: "United States", flag: "🇺🇸", region: "Americas", category: "Pastry", time: "1 hr 30", difficulty: "Medium",
    description: "Flaky double-crust pie packed with cinnamon apples and caramelised juices.",
    ingredients: ["2 sheets shortcrust pastry", "7 tart apples", "130g brown sugar", "2 tablespoons cornflour", "1½ teaspoons cinnamon", "30g butter", "1 egg"],
    steps: ["Heat the oven to 200°C and line a 23cm pie dish with pastry.", "Toss sliced apples with sugar, cornflour and cinnamon.", "Fill the crust, dot with butter and cover with the second pastry sheet.", "Crimp, cut steam vents, brush with egg and bake 20 minutes.", "Reduce to 180°C and bake 35–40 minutes; cool for 2 hours before slicing."],
    tip: "Cooling allows the apple juices to thicken instead of running out."
  },
  {
    title: "Fudge Brownies", country: "United States", flag: "🇺🇸", region: "Americas", category: "Cake", time: "45 min", difficulty: "Easy",
    description: "Deep chocolate brownies with shiny tops and dense, fudgy centres.",
    ingredients: ["200g dark chocolate", "170g butter", "250g sugar", "3 eggs", "100g plain flour", "30g cocoa powder", "½ teaspoon salt"],
    steps: ["Heat the oven to 175°C and line a 20cm square tin.", "Melt chocolate and butter together, then whisk in sugar.", "Add eggs one at a time until the mixture looks glossy.", "Fold in flour, cocoa and salt; spread into the tin.", "Bake 24–28 minutes until the edges set but the centre remains soft; cool fully."],
    tip: "A few moist crumbs on the skewer mean the brownies will stay fudgy."
  },
  {
    title: "Tres Leches Cake", country: "Mexico", flag: "🇲🇽", region: "Americas", category: "Cake", time: "1 hr + chill", difficulty: "Medium",
    description: "Feather-light sponge soaked with three milks and topped with whipped cream.",
    ingredients: ["180g plain flour", "5 eggs", "180g sugar", "1 teaspoon baking powder", "300ml evaporated milk", "300ml condensed milk", "250ml cream"],
    steps: ["Heat the oven to 175°C and line a rectangular baking dish.", "Whisk eggs and sugar until very thick, then fold in flour and baking powder.", "Bake 25–30 minutes and cool for 10 minutes.", "Poke the sponge all over and slowly pour on evaporated milk, condensed milk and 100ml cream.", "Chill for 4 hours and finish with softly whipped remaining cream."],
    tip: "Pour the milk mixture in stages so the sponge absorbs it evenly."
  },
  {
    title: "Brazilian Brigadeiros", country: "Brazil", flag: "🇧🇷", region: "Americas", category: "Confection", time: "35 min", difficulty: "Easy",
    description: "Soft chocolate truffles made with condensed milk and rolled in sprinkles.",
    ingredients: ["395g condensed milk", "30g cocoa powder", "25g butter", "Chocolate sprinkles", "Pinch of salt"],
    steps: ["Butter a shallow plate and set it aside.", "Cook condensed milk, cocoa, butter and salt over medium-low heat.", "Stir continuously for 10–12 minutes until the mixture pulls from the pan.", "Spread on the plate and cool completely.", "Butter your hands, roll small balls and coat each in chocolate sprinkles."],
    tip: "The mixture is ready when a spatula dragged through it leaves a clear path."
  }
];

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const desserts: DessertRecipe[] = seeds.map((dessert, index) => ({
  ...dessert,
  slug: `dessert-${slugify(dessert.title)}`,
  cuisine: dessert.country,
  image: dessertPhotos[index % dessertPhotos.length],
  servings: dessert.category === "Confection" ? "12 pieces" : "6",
}));

export const dessertBySlug = (slug: string) =>
  desserts.find((dessert) => dessert.slug === slug);
