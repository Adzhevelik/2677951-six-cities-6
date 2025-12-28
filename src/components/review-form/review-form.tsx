import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { postComment } from '../../store/action';

type ReviewFormProps = {
  offerId: string;
};

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 300;

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = rating > 0 && comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH;

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    dispatch(postComment({ offerId, comment, rating }))
      .unwrap()
      .then(() => {
        setRating(0);
        setComment('');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <div key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={handleRatingChange}
              disabled={isSubmitting}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
