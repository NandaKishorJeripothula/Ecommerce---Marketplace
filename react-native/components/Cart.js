import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StatusBar, Platform, View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, ToastAndroid} from 'react-native';
import {Text, Icon} from 'native-base';
import Item from './Item';

class Cart extends Component {
  constructor(props){
    super(props);
    this.state={
      total:0
    }
  }
  total=0;
  componentDidMount(){
    for(let i=0; i<this.props.cart.length; i++){
      this.total+=parseInt(this.props.cart[i].price);
    }
    this.setState({
      total:this.total
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props!=nextProps){
      for(let i=0; i<this.props.cart.length; i++){
        this.total+=parseInt(this.props.cart[i].price);
      }
      this.setState({
        total:this.total
      });
    }
  }

  pay = () => {
    ToastAndroid.show("You've reached the end of the app!", ToastAndroid.SHORT);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.containerStyle}>
        	<Item/>
      	</View>
        <View style={styles.containerStyle2}>

        <View style={styles.containerStyle3}>
          <View style={styles.goodsStyle}>
            <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
            <Text>{this.props.cart.length} goods</Text>
          </View>

          <View style={styles.totalStyle}>
            <Text>Total - </Text>
            <Text>Rs. {this.state.total}</Text>
          </View>
        </View>

          <View style={styles.buttonContainerStyle}>
            <TouchableNativeFeedback onPress={() => this.pay()}>
              <View style={styles.checkoutButtonStyle}>
                <Text style={{ color: '#fff' }}>Proceed to Pay</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 4,
    backgroundColor: '#DCDCDC'
  },
  containerStyle2: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom:15
  },
  closeButtonStyle: {
    backgroundColor: '#7f8c8d',
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 3,
  }, 
  checkoutButtonStyle: {
    backgroundColor: '#f39c12',
    padding: 10,
    paddingRight: 60,
    paddingLeft: 60,
    borderRadius: 3,
  },
  containerStyle3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15
  },
  goodsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
)(Cart);
