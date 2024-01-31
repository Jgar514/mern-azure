import { useEffect } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch('/api/workouts', {
				headers: { 'Authorization': `Bearer ${user.token}` },
			});

			try {
				const json = await response.json();

				if (response.ok) {
					console.log(json); // Log the json variable
					dispatch({ type: 'SET_WORKOUTS', payload: json });
				} else {
					console.error(json); // Log the error message if available
				}
			} catch (error) {
				console.error(error); // Log any error during JSON parsing
			}
		};

		if (user) {
			fetchWorkouts();
		}
	}, [dispatch, user]);


	return (
		<div className="home">
			<div className="workouts">
				{workouts?.length > 0 ? (
					workouts.map((workout) => (
						// Check if workout is defined before rendering WorkoutDetails
						workout ? (
							<WorkoutDetails key={workout._id} workout={workout} />
						) : null
					))
				) : (
					<p>No workouts available.</p>
				)}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
