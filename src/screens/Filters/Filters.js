import React, { useState, Fragment } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { useSelector } from 'react-redux';
import styles from './style';
import Header from '../../components/Header/Header';
import Accordion from '../../components/Accordion/Accordion';

const Filters = props => {

    const { navigation } = props;
    const { cocktails, alcoholicList, categories, glassList } = useSelector(state => state.cocktails);
    const [selectedAlcoholic, setSelectedAlcoholic] = useState('');
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedGlasses, setCheckedGlasses] = useState([]);

    const updateCheckedList = (type, item) => {
        let checkedList;
        let setChecked;
        if (type === 'categories') {
            checkedList = [...checkedCategories];
            setChecked = setCheckedCategories;
        } else if (type === 'glasses') {
            checkedList = [...checkedGlasses];
            setChecked = setCheckedGlasses;
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

    const handleSelectAlcoholic = (item) => {
        if (item === selectedAlcoholic) {
            setSelectedAlcoholic('')
        } else {
            setSelectedAlcoholic(item)
        }
    }

    const filterCocktails = () => {
        const filtered = [];
        cocktails.forEach((drink, index) => {
            if (
                (drink.strAlcoholic === selectedAlcoholic || selectedAlcoholic === '') &&
                (checkedCategories.some(category => category === drink.strCategory) || checkedCategories.length === 0) &&
                (checkedGlasses.some(glass => glass === drink.strGlass) || checkedGlasses.length === 0)
            ) {
                filtered.push(drink)
            }
        })
        navigation.navigate("Cocktails", { 
            title: `${filtered.length} Results`, 
            cocktails: filtered 
        })
    }

    const clearFiltersHandler = () => {
        setSelectedAlcoholic('');
        setCheckedCategories([]);
        setCheckedGlasses([]);
    }

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
                iconSize={32}
                title={'Filters'}
                titleColor={'white'}
                letterSpacing={4}
            />
            <View style={styles.screen}>
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <View>
                                <Accordion
                                    title={'Alcoholic'}
                                    list={alcoholicList}
                                    selected={selectedAlcoholic}
                                    selectHandler={(item) => handleSelectAlcoholic(item)}
                                />
                                <Accordion
                                    title={'Category'}
                                    list={categories.map(category => category.name)}
                                    checkedList={checkedCategories}
                                    isMultiSelect
                                    selectHandler={(item) => updateCheckedList('categories', item)}
                                />
                                <Accordion
                                    title={'Glass'}
                                    list={glassList}
                                    checkedList={checkedGlasses}
                                    isMultiSelect
                                    selectHandler={(item) => updateCheckedList('glasses', item)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.filterButton} onPress={filterCocktails}>
                    <Icon name='checkmark-outline' style={styles.filterIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={clearFiltersHandler}>
                    <Icon name='close-outline' style={styles.filterIcon} />
                </TouchableOpacity>
            </View>
        </Fragment>
    );
};

export default Filters;