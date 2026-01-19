# ROTAS
```sh
Api.get("/entregas", AppController.GetEntradas);
Api.get("/entregas/:id", AppController.GetEntradasBy);
Api.get("/entregas/search/:data", AppController.SearchEntradasBy);
Api.post("/entregas", AppController.PostEntradas);
Api.put("/entregas", AppController.PutEntradas);
Api.delete("/entregas", AppController.DeleteEntradas);

//saidas 
Api.get("/saidas", SaidasController.GetAll);
Api.get("/saidas/:id", SaidasController.GetBy);
Api.get("/saidas/search/:data", SaidasController.Search);
Api.post("/saidas", SaidasController.Post);
Api.put("/saidas", SaidasController.Update);
Api.delete("/saidas", SaidasController.Delete);

//produtos
Api.get("/produtos", ProdutosController.GetAll);
Api.get("/produtos/:id", ProdutosController.GetBy);
Api.get("/produtos/search/:data", ProdutosController.Search);
Api.post("/produtos", ProdutosController.Postar);
Api.put("/produtos", ProdutosController.Update);
Api.delete("/produtos", ProdutosController.Delete);

//entradas
Api.get("/entradas", EntradasController.GetAll);
Api.get("/entradas/:id", EntradasController.GetBy);
Api.get("/entradas/search/:data", EntradasController.Search);
Api.post("/entradas", EntradasController.Post);
Api.put("/entradas", EntradasController.Update);
Api.delete("/entradas", EntradasController.Delete);


//admin 
Api.post("/auth/login/register", LoginController.Register)
Api.put("/auth/login/register", LoginController.SetPassword)
Api.post("/auth/login/sign", LoginController.Sigin)
Api.get("/auth/admin/admin", LoginController.GetAll)
Api.get("/auth/admin/search/:data", LoginController.Search)
Api.delete("/auth/admin/admin", LoginController.Delete)
```

# INSTALACAO
```sh
npm install
npm run start
```
