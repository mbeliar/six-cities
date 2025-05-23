import Star from 'components/star/star';
import { FormEvent, ChangeEvent, useState } from 'react';
import { AuthorizationStatus, RatingTitles } from 'const';
import { useAppDispatch, useAppSelector } from 'hooks';
import { isValid } from './utils';
import { BaseReviewInfo } from 'types/review';
import { addReviewAction } from 'store/api-actions';


function ReviewForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);


  const handleTextareaInput = (evt: FormEvent<HTMLTextAreaElement>) => {
    const inputText = evt.currentTarget.value;

    setText(inputText);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;

    setRating(value);
  };

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const review: BaseReviewInfo = { comment: text, rating };
    dispatch(addReviewAction(review)); // ❔ Как здесь получить результат addReviewAction?

    setText('');
    evt.currentTarget.reset();
  };


  const auth = useAppSelector((state) => state.authorizationStatus);
  return (auth !== AuthorizationStatus.Auth)
    ? null
    : (
      <form className="reviews__form form" onSubmit={handleFormSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating" onChange={handleInputChange}>
          {RatingTitles.map((title) => <Star title={title} key={title.value} />)}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={text} minLength={50} maxLength={300} onInput={handleTextareaInput}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!isValid(text, rating)}>Submit</button>
        </div>
      </form>
    );
}


export default ReviewForm;
