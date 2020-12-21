import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { Text, Button, Textarea } from 'native-base';
import { Dialog, Portal, Button as Btn } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import styles from './style';
import Colors from '../../../constants/Colors';
import { leaveFeedback } from '../../../store/actions/ReviewsActions';

const Reviews = props => {

    const { idDrink } = props;

    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(3);

    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)
    const dispatch = useDispatch();

    const leaveFeedbackHandler = () => {
        dispatch(leaveFeedback(idDrink, token, userId, rating, comment))
        setShowModal(false);
    }

    const cancelHandler = () => {
        setShowModal(false);
        setComment('');
        setRating(3);
    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button success onPress={() => setShowModal(true)}>
                    <Text> Add </Text>
                </Button>
            </View>
            <Portal>
                <Dialog visible={showModal} onDismiss={cancelHandler} >
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
                                onChangeText={input => setComment(input)}
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