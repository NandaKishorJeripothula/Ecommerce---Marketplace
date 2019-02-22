import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';

class Item extends Component {

  constructor(props){
    super(props);
    this.state={
      cart:[]
    }
  }

  componentWillMount(){
    this.setState({
      cart:this.props.cart
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.cart!=nextProps.cart)
      this.setState({
        cart:this.props.cart
      });
  }


  removeItem = (name) => {
    console.log(this.state.cart);
    let arr=this.state.cart;
    for(i in arr){
      if(arr[i].name==name){
        arr.splice(i,1);
        console.log(arr);
        this.props.update('REMOVEFROMCART',{newarr:arr});
        this.setState({
          cart:arr
        })
        break;
      }
    }  
  }

  render() {
    return (
      <FlatList
        data={this.state.cart}
        extraData={this.state}
        renderItem={({item,index}) => (
          <View key={index} style={styles.containerStyle}>
          <Image source={{uri:item.image}} style={styles.imageStyle} />
          
          <View style={styles.textStyle}>
            <Text style={{ color: '#2e2f30' }}>{item.name}</Text>
            <View style={styles.priceStyle}>
              <Text style={{ color: '#2e2f30', fontSize: 12 }}>Rs.{item.price}</Text>
            </View>
          </View>
    
          <View>
            <TouchableOpacity onPress={() => this.removeItem(item.name)}>
              <View style={styles.buttons}>
                  <Icon style={{fontSize:14, color:'white'}} name='close'/>
              </View>
            </TouchableOpacity>
          </View>
    
        </View>
        )
      }
      />
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
    alignItems:'center'
  },
  lastItemStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 50, 
    height: 50, 
    marginRight: 20
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center'
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 40,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3
  },
  buttons:{
    width:30,
    height:25,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgb(231,76,60)'
  }
};

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
)(Item);
