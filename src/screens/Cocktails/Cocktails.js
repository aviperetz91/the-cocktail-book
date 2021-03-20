import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Card } from 'native-base';
import Header from '../../components/Header/Header';
import CocktailList from '../../components/CocktailList/CocktailList';
import Colors from '../../constants/Colors';
import styles from './style';
import { useEffect } from 'react';
import { getCategoryCocktails, clearData } from '../../store/actions/CocktailsActions';


const Cocktails = props => {

    const { navigation } = props;
    const { title, category, filteredCocktails } = props.route.params;
    const { categoryCocktails } = useSelector(state => state.cocktails);

    const dispatch = useDispatch();

    useEffect(() => {
        if (category) dispatch(getCategoryCocktails(title))
    }, [dispatch])

    const goBack = () => {
        dispatch(clearData('categoryCocktails'))
        navigation.goBack()
    }

    const cocktails = category ? categoryCocktails : filteredCocktails ? filteredCocktails : null;

    if (!cocktails) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            <Fragment>
                <Header
                    headerBackground={'black'}
                    statusBarColor={'rgba(0,0,0,0.4)'}
                    iosBarStyle={'light-content'}
                    pressHandler={goBack}
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


export default Cocktails