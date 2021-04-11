import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Platform, View, FlatList } from 'react-native';
import { Textarea, List } from 'native-base';
import { Dialog, Portal, Button as Btn } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import ReviewItem from '../../../components/ReviewItem/ReviewItem';
import Colors from '../../../constants/Colors';
import { leaveFeedback } from '../../../store/actions/UserActions';

const Reviews = props => {

    const { idDrink, strDrink, strDrinkThumb, showAddModal, setShowAddModal } = props;
    const { userId, userName } = useSelector(state => state.user);
    const { reviews } = useSelector(state => state.cocktails);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(3);
    
    const cocktailReviews = reviews.filter(rev => rev.idDrink === idDrink);
    
    const dispatch = useDispatch();

    const leaveFeedbackHandler = () => {
        dispatch(leaveFeedback(idDrink, strDrink, strDrinkThumb, userId, userName, rating, content))
        setShowAddModal(false);
    }

    const cancelHandler = () => {
        setShowAddModal(false);
        setContent('');
        setRating(3);
    }

    return (
        <View style={styles.screen}>
            <List>
                {cocktailReviews.map((item, index) => <ReviewItem key={index.toString()} review={item} />)}
            </List>
            <Portal>
                <Dialog visible={showAddModal} onDismiss={cancelHandler} style={styles.dialog}>
                    <Dialog.Content>
                        <View>
                            <AirbnbRating
                                showRating
                                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
                                count={5}
                                size={45}
                                onFinishRating={(value) => setRating(value)}
                            />
                        </View>
                        <View style={styles.textareaContainer}>
                            <Textarea
                                rowSpan={4}
                                bordered
                                placeholder="Leave your feedback here...."
                                onChangeText={input => setContent(input)}
                            />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Btn color={Colors.success} onPress={leaveFeedbackHandler}>Done</Btn>
                        <Btn color={Colors.danger} onPress={cancelHandler}>Cancel</Btn>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    dialog: {
        marginBottom: Platform.OS === 'android' ? 100 : 170
    },
    textareaContainer: {
        marginTop: 25,
    },
})

export default Reviews;