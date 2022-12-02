function ProductService(){
    this.getList = function () {
        return axios({
            url: "https://63661faa046eddf1baf95cec.mockapi.io/products",
            method: "GET",
          })   
    }
    this.addProduct = function (data){
        return axios({
            url: "https://63661faa046eddf1baf95cec.mockapi.io/products",
            method: "POST",
            data: data,
          }) 
    }
    this.getById = function(id){
        return axios({
            url: `https://63661faa046eddf1baf95cec.mockapi.io/products/${id}`,
            method: "GET",
          })   
    }
    this.updateProduct = function(id, data){
        return axios({
            url: `https://63661faa046eddf1baf95cec.mockapi.io/products/${id}`,
            method: "PUT",
            data: data,
          })
    }
    this.deleteProduct = function (id) {
        return axios({
            url: `https://63661faa046eddf1baf95cec.mockapi.io/products/${id}`,
            method: "DELETE",
          })
    }
}
