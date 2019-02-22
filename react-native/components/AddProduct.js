import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import {ImagePicker} from 'expo';
import {Text, Icon, List, ListItem, Thumbnail, Left, Right, Body, Button, Item, Input} from 'native-base';
import Store from './Store';



class AddProduct extends React.Component {
    constructor(props){
        super(props);
        this.state={
            product_name:'',
            price:'',
            description:'',
            category:'',
            imageuri:'http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/128/Add-icon.png'
        };
    }

    submitProduct(){
        // let data = new FormData();
        // data.append('picture',{uri:this.state.imageuri, name:'placeholder.jpg', type:'image/jpg'});
        // fetch('https://app.banner20.hasura-app.io/add_product',
        // {
        //     method:'post',
        //     headers: {
        //         "Accept": "application/json, text/plain, */*",
        //         "Content-Type": "multipart/form-data"
        //     },
        //     body:JSON.stringify({
        //         "data":{
        //             "product_name":this.state.product_name,
        //             "price":this.state.price,
        //             "description":this.state.description,
        //             "category":this.state.category,
        //             "file":data
        //         }               
        //     })
        // }).then((res) => {
        //     console.log(res);
        //     return res.text();
        // }).then((data) => {
        //     console.log(data);
        // });
        let uriParts = this.state.imageuri.split('.');
        let fileType = uriParts[uriParts.length - 1];
      
        let formData = new FormData();
        formData.append('photo', {
          uri:this.state.imageuri,
          name: "photo."+fileType,
          type: "image/"+fileType,
        });
      
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
      
        fetch('https://app.banner20.hasura-app.io/add_product', options).then((res) => {
            console.log(res);
        });
    }

    pickImage = async () => {
        //lock mediatype to images
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });
        console.log(result.uri);
        if(result.uri){
            this.setState({
                imageuri:result.uri
            });
        } //else ToastAndroid.show("Error uploading file",ToastAndroid.SHORT);
    }

    render() {
        return(
            <ScrollView contentContainerStyle={{paddingTop:20}}>
                <List>
                    <ListItem>
                        <TouchableOpacity onPress={() => this.pickImage()}>
                            <Left>
                                <Thumbnail square size={80} source={{uri:this.state.imageuri}}/>
                                <Text>Add Image</Text>
                            </Left>
                            <Body/>
                            <Right/>
                        </TouchableOpacity>
                    </ListItem>
                    <Input type='file' name='filename'/>
                    <ListItem style={{borderBottomColor:'rgba(0,0,0,0.0)'}}>
                        <Item regular>
                            <Input placeholder='Enter Product Name' onChangeText={(value)=>this.setState({product_name:value})} value={this.state.product_name}/>
                        </Item>
                    </ListItem>
                    <ListItem style={{borderBottomColor:'rgba(0,0,0,0.0)'}}>
                        <Item regular>
                            <Input multiline={true} numberOfLines={5} placeholder='Enter Product Description' onChangeText={(value)=>this.setState({description:value})} value={this.state.description}/>
                        </Item>
                    </ListItem>
                    <ListItem style={{borderBottomColor:'rgba(0,0,0,0.0)'}}>
                        <Item regular>
                            <Input keyboardType='numeric' placeholder='Enter Price' onChangeText={(value)=>this.setState({price:value})} value={this.state.price}/>
                        </Item>
                    </ListItem>
                    <ListItem style={{borderBottomColor:'rgba(0,0,0,0.0)'}}>
                        <Item regular>
                            <Input placeholder='Enter Product Category' onChangeText={(value)=>this.setState({category:value})} value={this.state.category}/>
                        </Item>
                    </ListItem>
                </List>
                <View style={styles.button}>
                <Button onPress={() => this.submitProduct()}><Text>Submit Product</Text></Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:50
    }
});

export default connect(
    (store) => {
        return store;
    }
)(AddProduct);
