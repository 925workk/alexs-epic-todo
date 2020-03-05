<template>
  <div>
    <div class="homePageContainer">
      <div class="container homePageContents">
        <div class="row">
          <div class="col-md-4">
            <img src="../../public/images/welcome-left.png" alt="man" style="height: 450px;" class="man">
          </div>
          <div class="col-md-4">
            <img src="../../public/images/logo.png" alt="logo" style="width: 110px;" class="mb-4">
            <br/>
            <h1>Vant4ge's Epic To Do App</h1>
            <img src="../../public/images/welcome-center.png" alt="man" style="height: 160px;" class="both mb-4">
            <br/>
            <h4 class="mb-5">To do lists provide your team clarity and focus. </h4>
            <a href="/todoapp"><button type="button" class="btn btn-primary btn-lg mb-5">Get Started</button></a>
            <br />
            <router-link to="/login">Login</router-link>
            <br />
            <router-link to="/register">Register</router-link>
          </div>
          <div class="col-md-4">
            <img src="../../public/images/welcome-right.png" alt="woman" style="height: 500px;" class="woman">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 
}
</script>

<style lang="scss" scoped>
  h1{
    font-family: 'Oswald', sans-serif;
  }

  .homePageContainer{
    width: 100%;
    background-image: url("../../public/images/nice_snow.png");
    background-repeat: repeat;
    height: 100vh;
    font-family: 'Merriweather', serif;
  }
  .homePageContents{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .man{
    position: relative;
    top: 50px;
  }
  @media (max-width: 992px) {
    .man{
      display: none;
    }
    .woman{
      display: none;
    }
  }
  @media (min-width: 993px){
    .both{
      display: none;
    }
  }
</style>
