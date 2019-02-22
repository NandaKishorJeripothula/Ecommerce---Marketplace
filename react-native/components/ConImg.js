import React from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Text} from 'native-base';

export default class ConImg extends React.Component {
  render() {
    return (
        <ImageBackground source={this.props.imageSource} style={styles.img}>
            <View style={styles.textWrapper}>
                <Text style={{opacity:1.0}}>{this.props.header}</Text>
            </View>
        </ImageBackground>
      
      
    );
  }
}

const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:200,
    },
    textWrapper:{
        height:'100%',
        width:'100%',
        backgroundColor:'rgba(255,255,255,0.35)',
        alignItems:'center',
        justifyContent: 'center'
    }

});
