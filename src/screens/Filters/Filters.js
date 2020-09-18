import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import styles from './style';
import { getIngredientList, getGlassList, getAlcoholicList } from '../../store/actions/CocktailsActions';
import Accordion from '../../components/Accordion/Accordion';
import Colors  from '../../constants/Colors';


const Filters = props => {

    const allCocktails = useSelector(state => state.cocktails.allCocktails);
    const categories = useSelector(state => state.cocktails.categories);
    const ingredientList = useSelector(state => state.cocktails.ingredientList);
    const glassList = useSelector(state => state.cocktails.glassList);
    const alcoholicList = useSelector(state => state.cocktails.alcoholicList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredientList());
        dispatch(getGlassList());
        dispatch(getAlcoholicList());
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <Accordion title={'Filter By Category'} list={categories} />
            <Accordion title={'Filter By Ingredient'} list={ingredientList} />
            <Accordion title={'Filter By Glass'} list={glassList} />
            <Accordion title={'Filter By Alcoholic'} list={alcoholicList} />
            <Button
                title="Show Results"
                type="solid"
                buttonStyle={{ padding: 10, backgroundColor: Colors.darkPrimary }}
                containerStyle={{ marginTop: 20, width: 350 }}
                onPress={() => console.log("CLICKED!")}
            />
        </View>
    );
};

export default Filters;