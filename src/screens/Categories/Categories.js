import React, { useEffect, Fragment } from 'react';
import { View, FlatList } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Icon, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../store/actions/CocktailsActions';
import categoriesImages from '../../constants/categoriesImages';
import Colors from '../../constants/Colors';
import CategoryBox from '../../components/CategoryBox/CategoryBox';
import styles from './style';


const Categories = props => {

    const navigation = props.navigation;

    const categories = useSelector(state => state.cocktails.categories);
    const categoriesLength = useSelector(state => state.cocktails.categoriesLength);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])


    if (!categories) {
        return (
            <View style={styles.spinnerContainer}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            <Fragment>
                <View>
                    <Header style={styles.header} androidStatusBarColor={'black'}>
                        <Left>
                            <Button transparent onPress={() => navigation.goBack()}>
                                <Icon name='arrow-back' style={{ color: 'black' }} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.title}>Categories</Title>
                        </Body>
                        <Right />
                    </Header>
                </View>
                <FlatList                    
                    contentContainerStyle={styles.screen}
                    keyExtractor={(item, index) => index}
                    data={categories.length % 2 !== 0 ? [...categories, ''] : categories}
                    numColumns={2}
                    renderItem={({ item }) => {
                        return (
                            <CategoryBox
                                title={item}
                                subTitle={categoriesLength[item]}
                                image={categoriesImages[categories.findIndex(el => el === item)]}
                                onSelect={() => navigation.navigate("CategoryCocktails", { title: item })}
                            />
                        )
                    }}
                />
            </Fragment>
        )
    }
}

export default Categories;