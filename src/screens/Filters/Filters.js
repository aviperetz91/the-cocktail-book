import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
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
    const glassList = useSelector(state => state.cocktails.glassList);
    // const alcoholicList = useSelector(state => state.cocktails.alcoholicList);
    const ingredientList = useSelector(state => state.cocktails.ingredientList);

    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedGlasses, setCheckedGlasses] = useState([]);
    // const [selectedAlcoholic, setSelectedAlcoholic] = useState('');
    const [checkedIngredients, setCheckedIngredients] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredientList());
        dispatch(getGlassList());
        // dispatch(getAlcoholicList());
    }, [dispatch])

    const updateCheckedList = (type, item) => {
        let checkedList;
        let setChecked;
        if (type === 'categories') {
            checkedList = [...checkedCategories];
            setChecked = setCheckedCategories;
        } else if (type === 'glasses') {
            checkedList = [...checkedGlasses];
            setChecked = setCheckedGlasses;
        } else if (type === 'ingredients') {
            checkedList = [...checkedIngredients]
            setChecked = setCheckedIngredients;
        }
        const isFound = checkedList.some(el => el === item);
        let updated;
        if (isFound) {
            updated = checkedList.filter(el => el !== item)
        } else {
            updated = [...checkedList, item]
        }
        setChecked(updated)
    }

    const filterCocktails = () => {
        let byCategories = [];
        for (let i = 0; i < allCocktails.length; i++) {
            for (let j = 0; j < checkedCategories.length; j++) {
                if (allCocktails[i].strCategory === checkedCategories[j] && !byCategories.some(el => el.idDrink === allCocktails[i].idDrink)) {
                    byCategories.push(allCocktails[i]);
                }
            }
        }
        console.log(byCategories)
        byCategories = byCategories.length > 0 ? byCategories : allCocktails;
        let byGlasses = [];
        for (let i = 0; i < byCategories.length; i++) {
            for (let j = 0; j < checkedGlasses.length; j++) {
                if (byCategories[i].strGlass === checkedGlasses[j] && !byGlasses.some(el => el.idDrink === byCategories[i].idDrink)) {
                    byGlasses.push(byCategories[i]);
                }
            }
        }
        console.log(byGlasses)
        byGlasses = byGlasses.length > 0 ? byGlasses : allCocktails;
        let byIngredients = [];
        for (let i = 0; i < byGlasses.length; i++) {
            for (let j = 0; j < checkedIngredients.length; j++) {
                if (byGlasses[i].ingredientList.some(ingredient => ingredient === checkedIngredients[j]) && !byIngredients.some(el => el.idDrink === byGlasses[i].idDrink)) {
                    byIngredients.push(byGlasses[i]);
                }
            }
        }
        console.log(byIngredients)
        navigation.navigate('FilteredCocktails', { filteredCocktails: byIngredients })
    }

    const clearFiltersHandler = () => {
        setCheckedCategories([]);
        setCheckedGlasses([]);
        // setSelectedAlcoholic('');
        setCheckedIngredients([]);
    }

    console.log(allCocktails)
    console.log(checkedCategories)
    console.log(checkedGlasses)
    // console.log(selectedAlcoholic)
    console.log(checkedIngredients)

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={{ marginBottom: 110 }}> 
                <View>
                    <Accordion
                        title={'Filter By Category'}
                        list={categories}
                        checkedList={checkedCategories}
                        isMultiSelect
                        selectHandler={(item) => updateCheckedList('categories', item)}
                    />
                    <Accordion
                        title={'Filter By Glass'}
                        list={glassList}
                        checkedList={checkedGlasses}
                        isMultiSelect
                        selectHandler={(item) => updateCheckedList('glasses', item)}
                    />
                    {/* <Accordion 
                title={'Filter By Alcoholic'} 
                list={alcoholicList} 
                selected={selectedAlcoholic}
                selectHandler={(item) => setSelectedAlcoholic(item)} 
            /> */}
                    <Accordion
                        filter={'ingredients'}
                        title={'Filter By Ingredient'}
                        list={ingredientList}
                        checkedList={checkedIngredients}
                        isMultiSelect
                        selectHandler={(item) => updateCheckedList('ingredients', item)}
                    />
                </View>
            </ScrollView>
            <View 
                style={{ 
                    backgroundColor: 'white',
                    width: '100%',
                    position: 'absolute', 
                    bottom: 0 
                }}
            >
                <Button
                    title="Clear filters"
                    type="solid"
                    buttonStyle={{ padding: 10, backgroundColor: Colors.accent }}
                    containerStyle={{ marginBottom: 10 }}
                    onPress={clearFiltersHandler}
                />
                <Button
                    title="Show Results"
                    type="solid"
                    buttonStyle={{ padding: 10, backgroundColor: Colors.darkPrimary }}
                    // containerStyle={{ marginTop: 10 }}
                    onPress={filterCocktails}
                />
            </View>
        </View>
    );
};

export default Filters;