import { useQuery } from "@tanstack/react-query";
import { getTodayBookings } from "../../services/apiBookings";

function useTodayBookings() {
	const { data, isLoading, error } = useQuery({
		queryKey: [
			"todayBookings",

			// , new Date(date).toDateString()
		],
		queryFn: () => getTodayBookings(),
	});

	return { data, isLoading, error };
}

export default useTodayBookings;
