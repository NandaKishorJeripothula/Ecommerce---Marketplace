import React from 'react';
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native';
export default class AHeader extends React.Component {
  render() {
    return (
      <View style={styles.header}>
      <Image source= {require('../image/logo.png')}
             style={styles.cart}
             />
             <Text style={styles.logo}>Elikart</Text>


          </View>
      
    );
  }
}

const styles = StyleSheet.create({
  header: {
      height : 60,
      marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    padding:20,
    borderBottomWidth:4,
    borderBottomColor:'#2a3990'

  },
  cart:{
      width:60,
      height:40

  },
  logo:{
      fontSize:20,
      marginLeft:10,
      fontStyle:'italic',
      color:'#2a3990'

  }

});
