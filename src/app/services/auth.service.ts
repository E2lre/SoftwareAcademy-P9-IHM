

export class AuthService{
  isAuth = false;
  //private tocken;
  signIn(username: string, pwd: string){

         this.isAuth = true;
  }
  signOut(){
    this.isAuth = false;
  }

}
