<template>
    <div class="container">
        <nav>
            <ul>
                <li ><a class="btn-redond-pri" href="#">100 clientes</a></li>
                <li><a href="#">200 clientes</a></li>
                <li><a href="#">300 clientes</a></li>
                <li ><a class="btn-redond-ult" href="#">400 clientes</a></li>
            </ul>
        </nav>
    </div>
    <div class="container">
        <nav>
            <ul>
                <li ><a class="btn-redond-pri" href="#">100 clientes</a></li>
                <li><a href="#">200 clientes</a></li>
                <li><a href="#">300 clientes</a></li>
                <li ><a class="btn-redond-ult" href="#">400 clientes</a></li>
            </ul>
        </nav>
    </div>
    <div class="container">
        <nav>
            <ul>
                <li ><a class="btn-redond-pri" href="#">100 clientes</a></li>
                <li><a href="#">200 clientes</a></li>
                <li><a href="#">300 clientes</a></li>
                <li ><a class="btn-redond-ult" href="#">400 clientes</a></li>
            </ul>
        </nav>
    </div>

  <!--   <div class="container cont">
        <div class="cont-img">
            <img src="../../assets/logotipo-ispbrain.png" alt="logo ispb">
        </div>
        <div class="cont-img est-etiquetas">
            <h2>Lite</h2>
            <h3>2300AR$/mes</h3>
            <h6>Sin pago inicial</h6>
            <h6>*Precios con impuestos incluidos</h6>
        </div>
        <div class="cont-img est-etiquetas">
            <h2>Pro</h2>
            <h3>3500AR$/mes</h3>
            <h6>Con pago inicial $8000</h6>
            <h6>*Precios con impuestos incluidos</h6>
        </div>
        <div class="cont-img est-etiquetas">
            <h2>Pro+</h2>
            <h3>5300AR$/mes</h3>
            <h6>Con pago inicial $8000</h6>
            <h6>*Precios con impuestos incluidos</h6>
        </div>
    </div> -->
</template>

<script>
export default {

}
</script>

<style scoped>

.container{
    width:800px;
    margin:auto;
    text-align: center;
    border: 1px solid red;
}

.cont{
    display: flex;
}

.est-etiquetas{
    
    padding: 20px;
    border: 1px solid rgb(168, 168, 168);
    color:white;
    background-color: #c7564b;
   /*  background-color: linear-gradient(90deg,rgb(185, 129, 125) 0%,rrgb(177, 81, 74)100%); */
}

.cont-img{
    width:250px;
    height: 195px;
    margin-left:auto;
}
img{
    max-width: 100%;
    margin:auto;
}

nav{
    box-sizing: border-box;
    padding:40px;
    border: 1px solid rgb(196, 196, 196);
}

li{
    display: inline-block;
}

.btn-redond-pri{
    border: 1px solid rgb(196, 196, 196);
    border-radius:50px 0 0 50px;
}

.btn-redond-ult{
    
    border: 1px solid rgb(196, 196, 196);
    border-radius:0 50px 50px 0;
}


a{
    padding:10px 15px;
    border: 1px solid rgb(196, 196, 196);
    color:rgb(32, 32, 32);
}

a:focus{
    border-color: #c7564b;
    background-color: #c7564b;
    color:white;
}


a:hover{
    transition: color 1s;
    color:#c7564b;
}
</style>