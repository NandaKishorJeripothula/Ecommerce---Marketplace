import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Icon, List, ListItem, Thumbnail, Left, Right, Body, Button} from 'native-base';
import Store from './Store';



class Checkout extends React.Component {
    render() {
        return(
            <ScrollView contentContainerStyle={{paddingTop:20}}>
                <List>
                    <ListItem>
                        <Left>
                            <Thumbnail square size={80} source={{uri:'http://www.baltimoreblackcar.com/assets/images/vehicles/thumb-placeholder.png'}}/>
                            <Text>Boat SuperBass Earphones</Text>
                        </Left>
                        <Right/>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Thumbnail square size={80} source={{uri:'http://www.baltimoreblackcar.com/assets/images/vehicles/thumb-placeholder.png'}}/>
                            <Text>Apple iPhone SE</Text>
                        </Left>
                        <Right/>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Thumbnail square size={80} source={{uri:'http://www.baltimoreblackcar.com/assets/images/vehicles/thumb-placeholder.png'}}/>
                            <Text>Mont Blanc Watch</Text>
                        </Left>
                        <Right/>
                    </ListItem>
                </List>
                <View style={styles.button}>
                <Button><Text>Proceed to Pay</Text></Button>
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
)(Checkout);
