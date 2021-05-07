import React, { Fragment } from 'react';
import { StyleSheet, Text } from 'react-native';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import CocktailList from '../../components/CocktailList/CocktailList';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';


const Cocktails = props => {

    const { navigation } = props;
    const { title, cocktails } = props.route.params;

    if (!cocktails) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <Fragment>
                <Header
                    headerBackground={'black'}
                    statusBarColor={'transparent'}
                    iosBarStyle={'light-content'}
                    pressHandler={navigation.goBack}
                    iconType={'MaterialCommunityIcons'}
                    iconName={'keyboard-backspace'}
                    iconColor={'white'}
                    iconSize={29}
                    title={title}
                    titleColor={'white'}
                    letterSpacing={3}
                />
                { cocktails.length === 0 ?
                    <Card style={styles.card}>
                        <Text style={styles.cardText}>No results matched your filters</Text>
                    </Card>
                    :
                    <CocktailList navigation={navigation} cocktails={cocktails} />
                }
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 25, 
        marginLeft: 15, 
        marginRight: 15, 
        padding: 15 
    },
    cardText: {
        fontSize: 22, 
        color: '#dc3545' 
    }
})

export default Cocktails