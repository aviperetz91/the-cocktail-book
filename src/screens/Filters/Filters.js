import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import styles from './style';
import { getIngredientList, getGlassList, getAlcoholicList } from '../../store/actions/CocktailsActions';
import Accordion from '../../components/Accordion/Accordion';


const Filters = props => {

    const ingredientList = useSelector(state => state.cocktails.ingredientList);
    const glassList = useSelector(state => state.cocktails.glassList);
    const alcoholicList = useSelector(state => state.cocktails.alcoholicList);
    const FilterdCocktails = useSelector(state => state.cocktails.cocktails);

    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(getIngredientList());
        dispatch(getGlassList());
        dispatch(getAlcoholicList());
    }, [dispatch])

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <Accordion title={'Filter By Ingredient'} list={ingredientList} itemStr={'strIngredient1'}/>
            <Accordion title={'Filter By Glass'} list={glassList} itemStr={'strGlass'}/>
            <Accordion title={'Filter By Alcoholic'} list={alcoholicList} itemStr={'strAlcoholic'}/>
        </ScrollView>
    );
};

export default Filters;