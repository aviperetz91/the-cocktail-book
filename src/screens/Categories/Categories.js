import React, { Fragment } from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import categoriesImages from '../../constants/categoriesImages';
import Header from '../../components/Header/Header';
import CategoryBox from '../../components/CategoryBox/CategoryBox';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';


const Categories = props => {

    const { navigation } = props;
    const { categories, cocktails } = useSelector(state => state.cocktails);

    const navigate = (name) => {
        navigation.navigate("Cocktails", {
            title: name,
            cocktails: cocktails.filter(cocktail => cocktail.strCategory === name)
        })
    }

    if (!categories) {
        return (
            <LoadingScreen />
        )
    } else {
        return (
            <Fragment>
                <Header
                    headerBackground={'white'}
                    statusBarColor={'transparent'}
                    pressHandler={navigation.goBack}
                    iosBarStyle={'dark-content'}
                    iconType={'MaterialCommunityIcons'}
                    iconName={'keyboard-backspace'}
                    iconColor={'black'}
                    iconSize={32}
                    title={'Categories'}
                    titleColor={'black'}
                    letterSpacing={4}
                />
                <FlatList
                    contentContainerStyle={styles.screen}
                    keyExtractor={(item, index) => index.toString()}
                    data={categories.length % 2 !== 0 ? [...categories, ''] : categories}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <CategoryBox
                                title={item.name}
                                subTitle={item.length}
                                image={categoriesImages[categories.findIndex(el => el === item)]}
                                onSelect={() => navigate(item.name)}
                            />
                        )
                    }}
                />
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 6,
        paddingHorizontal: 12, 
        backgroundColor: 'white'
    }
})

export default Categories;