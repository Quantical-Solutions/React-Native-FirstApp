import React from 'react'
import { StyleSheet, View, Platform, Animated, PanResponder, Dimensions } from 'react-native'
import { Easing } from "react-native"
import HelloWorld from "./HelloWorld"

class Test extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //topPosition: new Animated.Value(0), // Without PanResponder
            //leftPosition: new Animated.Value(0) // Without PanResponder
            topPosition: 0, // With PanResponder
            leftPosition: 0 // With PanResponder
        }

        // With PanResponder
        var {height, width} = Dimensions.get('window');
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let touches = evt.nativeEvent.touches;
                if (touches.length === 1) {
                    this.setState({
                        topPosition: touches[0].pageY - height/2,
                        leftPosition: touches[0].pageX - width/2
                    })
                }
            }
        })
    }

    // Without PanResponder
    /*componentDidMount() {
        Animated.parallel([
            Animated.spring(
                this.state.topPosition,
                {
                    toValue: 100,
                    tension: 8,
                    friction: 3
                }
            ),
            Animated.timing(
                this.state.leftPosition,
                {
                    toValue: 100,
                    duration: 1000,
                    easing: Easing.elastic(2)
                }
            )
        ]).start()
    }

    render() {
        return (
            <View style={styles.main_container}>
                <HelloWorld/>
                <Animated.View style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
                </Animated.View>
            </View>
        )
    }*/

    // With PanResponder
    render() {
        return (
            <View style={styles.main_container}>
                <View
                    {...this.panResponder.panHandlers}
                    style={[styles.animation_view, { top: this.state.topPosition, left: this.state.leftPosition }]}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation_view: {
        //backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
        ...Platform.select({
            ios: {
                backgroundColor: 'red'
            },
            android: {
                backgroundColor: 'blue'
            }
        }),
        height: 50,
        width: 50
    }
})

export default Test