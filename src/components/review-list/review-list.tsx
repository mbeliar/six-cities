import ReviewItem from 'components/review/review';
import { MAX_REVIEWS_COUNT } from 'const';
import { Reviews } from 'types/review';


type ReviewListProps = {
  reviews: Reviews;
}

function ReviewList({reviews}: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {reviews.slice(0, MAX_REVIEWS_COUNT).map((review) => <ReviewItem review={review} key={review.id} />)}
    </ul>
  );
}


export default ReviewList;
