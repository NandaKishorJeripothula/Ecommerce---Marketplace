import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class OverText extends React.Component {
  render() {
      let header = this.props.header ?
      <Text style = {styles.OverTextHeader}>{this.props.header}</Text>
       :null;
       let para = this.props.para ?
       <Text style ={styles.OverText}>{this.props.para}</Text>
        :null;
      return (
        <View>
            {header}
            {para}

        </View>
      
      
    );
  }
}

const styles = StyleSheet.create({
    OverTextHeader:
    {
        shadowColor:'#000',
        shadowOffset:{width: 0,height:2,},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation:1,
        alignSelf:'center',
        fontSize: 28,
        color : '#292929',
        textAlign:'center',
        padding: 10,
        backgroundColor:'rgba(255,255,255,0.6)',
        fontWeight:'bold',
    },
    OverText:
    {
        shadowColor:'#000',
        shadowOffset:{width: 0,height:2,},
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation:1,
        alignSelf:'center',
        fontSize: 16,
        fontStyle:'italic',
        color : '#292929',
        textAlign:'center',
        padding: 7,
        backgroundColor:'rgba(255,255,255,0.6)',
        marginTop: 8,

    }
  

});
