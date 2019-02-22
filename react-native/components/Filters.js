import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Icon, Form, Item, Input, Label, Button, Container, List, ListItem, CheckBox, Body} from 'native-base';
import Store from './Store';



class Filters extends React.Component {
    constructor(props){
        super(props);
        this.state={
            samsong:true,
            eljee:true,
            orange:true,
            nokiya:true
        };
    }

    render() {
        return(
            <ScrollView>
                <Text style={styles.label}>Price range:</Text>
                <Form style={{flexDirection:'row', justifyContent:'center'}}>
                    <Item bordered floatingLabel style={styles.searchbar}>
                        <Label>Min Price</Label>
                        <Input keyboardType='numeric'/>
                    </Item>
                    <Item bordered floatingLabel style={[styles.searchbar,{marginLeft:0}]}>
                        <Label>Max Price</Label>
                        <Input keyboardType='numeric'/>
                    </Item>
                </Form>
                <Text style={styles.label}>Select brands:</Text>
                <List>
                    <ListItem style={{backgroundColor:'rgba(255,255,255,0.0)'}}>
                        <CheckBox onPress={() => {this.setState({samsong:!this.state.samsong})}} checked={this.state.samsong}/>
                        <Body>
                            <Text>Samsong</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{backgroundColor:'rgba(255,255,255,0.0)'}}>
                        <CheckBox onPress={() => {this.setState({eljee:!this.state.eljee})}} checked={this.state.eljee}/>
                        <Body>
                            <Text>ElJee</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{backgroundColor:'rgba(255,255,255,0.0)'}}>
                        <CheckBox onPress={() => {this.setState({orange:!this.state.orange})}} checked={this.state.orange}/>
                        <Body>
                            <Text>Orange</Text>
                        </Body>
                    </ListItem>
                    <ListItem style={{backgroundColor:'rgba(255,255,255,0.0)'}}>
                        <CheckBox onPress={() => {this.setState({nokiya:!this.state.nokiya})}} checked={this.state.nokiya}/>
                        <Body>
                            <Text>Nokiya</Text>
                        </Body>
                    </ListItem>
                </List>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Button style={{}} onPress={() => this.props.navigation.goBack()}>
                            <Text>Apply filter</Text>
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    searchbar:{
        backgroundColor:'rgba(255,255,255,0.87)',
        width:'45%',
        marginTop:10,
        marginLeft: 10,
        marginRight: 10
    },
    label:{
        marginLeft:10, 
        marginTop:10, 
        fontWeight:'700'
    }
});

export default connect(
    (store) => {
        return store;
    }
)(Filters);
