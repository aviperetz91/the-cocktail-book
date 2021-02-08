import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Textarea, List } from 'native-base';
import { Dialog, Portal, Button as Btn } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import ReviewItem from '../../../components/ReviewItem/ReviewItem';
import styles from './style';
import Colors from '../../../constants/Colors';
import { leaveFeedback } from '../../../store/actions/UserActions';

const Reviews = props => {

    const { idDrink, strDrink, strDrinkThumb, showAddModal, setShowAddModal } = props;
    const { userId, userName } = useSelector(state => state.user);
    const { cocktailReviews } = useSelector(state => state.cocktails);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(3);

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
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={cocktailReviews}
                    renderItem={({ item }) => <ReviewItem review={item} userId={userId} />}
                />
            </List>
            <Portal>
                <Dialog visible={showAddModal} onDismiss={cancelHandler} >
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

export default Reviews;