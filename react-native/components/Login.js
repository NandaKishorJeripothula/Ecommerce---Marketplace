import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, KeyboardAvoidingView, ScrollView, ToastAndroid, AsyncStorage} from 'react-native';
import {Text, H1, Container, Content, Button, Card, CardItem, Body, Form, Item, Label, Input, Icon, Picker} from 'native-base';

class Login extends React.Component {
    constructor(){
        super();
        this.state={
            showLogin:true,
            userStatus:'seller',
            email:'',
            pass:'',
            confpass:'',
            fname:'',
            lname:'',
            mobile:''
        };
        }

    handleSignup=() => {
        this.setState({
          showLogin:false
        });
        let url=(this.state.userStatus=='seller')?'https://app.banner20.hasura-app.io/seller_signup':'https://app.banner20.hasura-app.io/signup';
        fetch(url,
        {
            method:"post",
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "provider":"username",
                "data": {
                    "first_name":this.state.fname,
                    "last_name":this.state.lname,
                    "email": this.state.email,
                    "phone_number":this.state.mobile,
                    "password": this.state.pass,
                    "passconfirm":this.state.passconfirm
                }       
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            if(data.error)
              ToastAndroid.show(data.error,ToastAndroid.LONG);
            else 
              ToastAndroid.show('Signup succesfull!',ToastAndroid.LONG);

        });
    }

    handleLogin=() => {
      console.log("Login handling...");
      fetch('https://app.banner20.hasura-app.io/login',
      {
          method:"post",
          headers: {
              "Accept": "application/json, text/plain, */*",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              "provider":"username",
              "data": {
                  "email": this.state.email,
                  "password": this.state.pass
              }       
          })
      }).then((res) => {
          console.log(res);
          return res.json();
      }).then((data) => {
          console.log(data);
          if(!data.auth_token)
            ToastAndroid.show('Invalid email or password!',ToastAndroid.SHORT);
          else{
            ToastAndroid.show('Login success!',ToastAndroid.LONG);
            this.props.update('LOGIN',{isLoggedIn:true, auth_token:data.auth_token});
            AsyncStorage.setItem('HPDF_AUTH_TOKEN',data.auth_token);
          }
      });
    }

    handleLogout=() => {
      console.log("Logout handling...");
      fetch('https://app.banner20.hasura-app.io/logout').then((res) => {
          return res.json();
      }).then((data) => {
          console.log(data);
          if(data.message=='logged out'){
            this.props.update('LOGIN',{isLoggedIn:false,auth_token:''});
            AsyncStorage.setItem('HPDF_AUTH_TOKEN',null);
          }
      });
    }

    setShowLogin=() => {
      this.setState({
        showLogin:true
      });
    }

    changeStatus=(value) => {
      this.setState({
        userStatus:value
      });
    }
  
  render() {
    return (
      <KeyboardAvoidingView behavior='padding'>
        <ScrollView contentContainerStyle={styles.container}>
        {(!this.props.isLoggedIn)?
            <Form style={styles.form}>
            {(this.state.showLogin)?
              <View style={{height:30}}/>:
              <Button transparent dark iconLeft onPress={this.setShowLogin}><Icon name='arrow-back'/></Button>
            }

              <Item floatingLabel style={{width:'70%'}}>
                <Label>E-mail</Label>
                <Input style={{color:'black'}} onChangeText={(value)=>{this.setState({email:value})}} value={this.state.email}/>
              </Item>

              <Item floatingLabel style={{width:'70%'}}>
                <Label>Password</Label>
                <Input secureTextEntry={true} style={{color:'black'}} onChangeText={(value)=>{this.setState({pass:value})}} value={this.state.pass}/>
              </Item>


              {(this.state.showLogin)?null:
              <View>
                <Item floatingLabel style={{width:'70%'}}>
                  <Label>Confirm password</Label>
                  <Input secureTextEntry={true} style={{color:'black'}} onChangeText={(value)=>{this.setState({confpass:value})}} value={this.state.confpass}/>
                </Item>

                <Item floatingLabel style={{width:'70%'}}>
                  <Label>First Name</Label>
                  <Input style={{color:'black'}} onChangeText={(value)=>{this.setState({fname:value})}} value={this.state.fname}/>
                </Item>

                <Item floatingLabel style={{width:'70%'}}>
                  <Label>Second Name</Label>
                  <Input style={{color:'black'}} onChangeText={(value)=>{this.setState({lname:value})}} value={this.state.lname}/>
                </Item>

                <Item floatingLabel style={{width:'70%'}}>
                  <Label>Mobile number</Label>
                  <Input keyboardType='numeric' style={{color:'black'}} onChangeText={(value)=>{this.setState({mobile:value})}} value={this.state.mobile}/>
                </Item>

                <Picker style={{marginLeft:5}} selectedValue={this.state.userStatus} onValueChange={this.changeStatus}>
                  <Picker.Item label='Buyer' value='buyer'/>
                  <Picker.Item label='Seller' value='seller'/>
                </Picker>

              </View>
              }

              {(this.state.showLogin)?
                <Button full success style={{marginLeft:15, marginRight:15}} onPress={() => this.handleLogin()}><Text>Log In</Text></Button>
              :null}
              <View style={{height:10}}/>
              <Button full primary style={{marginLeft:15, marginRight:15}} onPress={() => this.handleSignup()}><Text>Sign Up</Text></Button>
            </Form>
        :<Button full warning style={{marginLeft:15, marginRight:15}} onPress={() => this.handleLogout()}><Text>Log Out</Text></Button>
        }
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:'rgb(230,230,230)', 
    paddingLeft:10, 
    paddingRight:10, 
    paddingTop:20,
    paddingBottom:20,  
    justifyContent:'center'
  },
  form:{
    backgroundColor:'rgba(255,255,255,0.87)', 
    alignItems:'center',
    borderRadius:10

  }
});

export default connect(
    (store) => {
        return store;
    },
    (dispatch) => {
      return {
        update:(dispatchType,dispatchPayload) => {
          dispatch({type:dispatchType, payload:dispatchPayload});
        }
      }
    }
)(Login);