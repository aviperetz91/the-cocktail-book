import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Platform, View } from 'react-native';
import { Textarea, List } from 'native-base';
import { Dialog, Portal, Title, Button as Btn } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import ReviewItem from '../../../components/ReviewItem/ReviewItem';
import Colors from '../../../constants/Colors';
import { leaveFeedback, editFeedback, deleteFeedback } from '../../../store/actions/UserActions';

const Reviews = props => {

    const { idDrink, strDrink, strDrinkThumb, showAddModal, setShowAddModal } = props;
    const { userId, userName } = useSelector(state => state.user);
    const { reviews } = useSelector(state => state.cocktails);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(3);
    const [editMode, setEditMode] = useState(false);
    const [editReviewIndex, setEditReviewIndex] = useState();
    const [deleteMode, setDeleteMode] = useState(false);
    const [deletedReviewIndex, setDeletedReviewIndex] = useState();

    const cocktailReviews = reviews.filter(rev => rev.idDrink === idDrink);

    const dispatch = useDispatch();

    const feedbackHandler = () => {
        let date;
        if (editMode) {
            date = cocktailReviews[editReviewIndex].date;
            dispatch(editFeedback(idDrink, date, content, userId))
            setEditMode(false);
        } else if (deleteMode) {
            date = cocktailReviews[deletedReviewIndex].date;
            dispatch(deleteFeedback(idDrink, date, userId))
            setDeleteMode(false);
        } else {
            dispatch(leaveFeedback(idDrink, strDrink, strDrinkThumb, userId, userName, rating, content))
            setShowAddModal(false);
        }
    }

    const cancelHandler = () => {
        setShowAddModal(false);
        setEditMode(false);
        setDeleteMode(false)
        setEditReviewIndex(null)
        setContent('');
        setRating(3);
    }

    return (
        <View style={styles.screen}>
            <List>
                {cocktailReviews.map((item, index) => (
                    <ReviewItem
                        key={index.toString()}
                        review={item}
                        index={index}
                        setEditMode={setEditMode}
                        setEditReviewIndex={setEditReviewIndex}
                        setDeleteMode={setDeleteMode}
                        setDeletedReviewIndex={setDeletedReviewIndex}
                    />
                ))}
            </List>
            <Portal>
                <Dialog visible={showAddModal || editMode} onDismiss={cancelHandler} style={styles.dialog}>
                    <Dialog.Content>
                        <View>
                            <AirbnbRating
                                showRating
                                defaultRating={editMode ? cocktailReviews[editReviewIndex].rating : 3}
                                reviews={['Bad', 'Okay', 'Good', 'Great', 'Awesome']}
                                count={5}
                                size={45}
                                onFinishRating={(value) => setRating(value)}
                            />
                        </View>
                        <View style={styles.textareaContainer}>
                            <Textarea
                                rowSpan={4}
                                bordered
                                placeholder={"Leave your feedback here...."}
                                defaultValue={editMode ? cocktailReviews[editReviewIndex].content : content}
                                onChangeText={input => setContent(input)}
                            />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Btn color={Colors.success} onPress={feedbackHandler}>Done</Btn>
                        <Btn color={Colors.danger} onPress={cancelHandler}>Cancel</Btn>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={deleteMode} onDismiss={cancelHandler} style={styles.dialog}>
                    <Dialog.Content>
                        <Title>Are you sure you want to delete the review?</Title>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Btn color={Colors.success} onPress={feedbackHandler}>Yes</Btn>
                        <Btn color={Colors.danger} onPress={cancelHandler}>No</Btn>
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