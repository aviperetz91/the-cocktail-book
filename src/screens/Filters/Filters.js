import React, { useEffect, useState } from 'react';
import { ScrollView, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import styles from './style';
import { getIngredientList, getGlassList, getAlcoholicList } from '../../store/actions/CocktailsActions';
import Accordion from '../../components/Accordion/Accordion';
import Colors from '../../constants/Colors';

const Filters = props => {

    const navigation = props.navigation;

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

    const [selectedCategory, setSelectedCategory] = useState('');
    const [checkedIngredients, setCheckedIngredients] = useState([]);
    const [selectedGlass, setSelectedGlass] = useState('');
    const [selectedAlcoholic, setSelectedAlcoholic] = useState('');

    const updateCheckedIngredients = (item) => {
        const isFound = checkedIngredients.some(el => el === item);
        let updated;
        if (isFound) {
            updated = checkedIngredients.filter(el => el !== item)
        } else {
            updated = [...checkedIngredients, item]
        }
        setCheckedIngredients(updated)
    }

    const filterCocktails = () => {
        console.log('===================')
        console.log("selectedCategory: ", selectedCategory);
        console.log("checkedIngredients: ". checkedIngredients);
        console.log("selectedGlass: ", selectedGlass);
        console.log("selectedAlcoholic: ", selectedAlcoholic);
        console.log('===================')
        const byCategory = allCocktails.filter(cocktail => cocktail.strCategory === selectedCategory);
        const byGlass = byCategory.filter(cocktail => cocktail.strGlass ===  selectedGlass);
        const byAlcoholic = byGlass.filter(cocktail => cocktail.strAlcoholic === selectedAlcoholic);
        const byIngredients = [];
        for (let i = 0; i < byAlcoholic.length; i++) {
            for (let j = 0; j < checkedIngredients.length; j++) {
                if (byAlcoholic[i].ingredientList.some(ingredient => ingredient === checkedIngredients[j])) {
                    byIngredients.push(byAlcoholic[i]);
                }
            }
        }
        console.log('===================')
        console.log("byCategory: ", byCategory)
        console.log("byGlass: ", byGlass)
        console.log("byAlcoholic: ", byAlcoholic)
        console.log("byIngredients: ", byIngredients)

        navigation.navigate('FilteredCocktails', { filteredCocktails: byIngredients })
    }

    return (
        <View style={styles.screen}>
            <Accordion title={'Filter By Category'} list={categories} selectHandler={(item) => setSelectedCategory(item)} />
            <Accordion title={'Filter By Glass'} list={glassList} selectHandler={(item) => setSelectedGlass(item)} />
            <Accordion title={'Filter By Alcoholic'} list={alcoholicList} selectHandler={(item) => setSelectedAlcoholic(item)} />
            <Accordion title={'Filter By Ingredient'} list={ingredientList} isMultiSelect selectHandler={(item) => updateCheckedIngredients(item)} />
            <Button
                title="Show Results"
                type="solid"
                buttonStyle={{ padding: 10, backgroundColor: Colors.darkPrimary }}
                containerStyle={{ marginTop: 20, width: 350 }}
                onPress={filterCocktails}
            />
        </View>
    );
};

export default Filters;