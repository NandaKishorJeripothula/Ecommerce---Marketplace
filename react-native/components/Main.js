import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, TouchableOpacity, ScrollView, ToastAndroid, AsyncStorage} from 'react-native';
import {Text, Icon, Form, Item, Input, Button, Container} from 'native-base';
import Store from './Store';
import ConImg from './ConImg';



class Main extends React.Component {

    constructor(props){
        super(props);
        this.state={
            products:[<View style={{height:0,width:0}}/>],
            searchText:''
        };
    }

    componentWillMount(){
        fetch('https://app.banner20.hasura-app.io/').then((res) => {
            return res.text();
        }).then((data) => {
            data=JSON.parse(data)[1];
            for(let i=0; i<=6; i+=2){
                console.log(data[i]);
                this.setState({
                    products:this.state.products.concat([
                        <View style={styles.con}>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Productpage',{product_id:data[i].id})}}>
                                <ConImg 
                                imageSource={{uri:data[i].first_image_url}}
                                header = {data[i].name}
                                />
                            </TouchableOpacity>
                        </View>,
                        <View style={styles.con}>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Productpage',{product_id:data[i+1].id})}}>
                                <ConImg 
                                imageSource={{uri:data[i+1].first_image_url}}
                                header = {data[i+1].name}
                                />
                            </TouchableOpacity>
                        </View>,
                        <View style={styles.conBanner}/>
                    ])
                });
            }
        });
    }

    componentDidMount(){
        AsyncStorage.getItem('HPDF_AUTH_TOKEN',(error,data) => {
            if(data!=null && data!='')
                this.props.update('LOGIN',{isLoggedIn:true, auth_token:data});
        });
    }

    c=0;

    searchResults=() => {
        ToastAndroid.show("Searching...",ToastAndroid.LONG);
        this.setState({
            products:[<View style={{height:0,width:0}}/>]
        });
        fetch('https://app.banner20.hasura-app.io/search',
        {
            method:'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "data": {
                    "search": this.state.searchText
                }       
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            if(data.length==0){
                this.setState({
                    products:<Text style={styles.noresults}>No Results Found</Text>
                });
            }
            else{
                for(i in data){
                    this.setState({
                        products:this.state.products.concat([
                            <View style={styles.con}>
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Productpage',{product_id:data[i].id})}}>
                                    <ConImg 
                                    imageSource={{uri:data[i].first_image_url}}
                                    header = {data[i].name}
                                    />
                                </TouchableOpacity>
                            </View>                        
                        ])
                    });
                    this.c++;
                    if(this.c==2){
                        this.c=0;
                        this.setState({
                            products:this.state.products.concat([<View style={styles.conBanner}/>])
                        });
                    }
                }
            }
        });
    }

    render() {
        return(
            <ScrollView>
                <Form style={{flexDirection:'row'}}>
                    <Item rounded bordered style={styles.searchbar}>
                        <Input placeholder="Search..." onChangeText={(text) => {this.setState({searchText:text})}} value={this.state.searchText}/>
                    </Item>
                    <Button onPress={this.searchResults} light style={styles.filterButton}>
                        <Icon name='search'/>
                    </Button>
                    {/*<Button onPress={() => {this.props.navigation.navigate('Filters')}} light style={styles.filterButton}>
                        <Icon name='settings'/>
                    </Button>
                    */}
                </Form>
                <View style={styles.comContainer}>
                    {this.state.products}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    searchbar:{
        backgroundColor:'rgba(255,255,255,0.87)',
        width:'70%',
        marginTop:10,
        marginLeft: 20
    },
    filterButton:{
        marginTop:10,
        marginLeft: 10
    },
    comContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        padding:5,
    },
    con:{
     flex: 1,
     padding: 5
    },
    conBanner:{
        width:'100%',
        alignItems:'center',
        justifyContent :'center',
        padding:5
    },
    noresults:{
        fontSize:30,
        color:'rgba(0,0,0,0.4)',
        marginLeft:70,
    }
});

export default connect(
    (store) => {
        return store;
    },
    (dispatch) => {
      return {
        update:(dispatchType, dispatchPayload) => {
          dispatch({type: dispatchType, payload: dispatchPayload});
        }
      }
    }
)(Main);
