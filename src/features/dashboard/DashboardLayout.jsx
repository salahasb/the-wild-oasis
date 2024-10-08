import styled from "styled-components";
import Stat from "./Stat";
import useRecentBookings from "./useRecentBookings";
import { formatCurrency } from "../../utils/helpers";
import { MainSpinner } from "../../ui/LoadingSpinners";
import { useSearchParams } from "react-router-dom";
import { formatISO, subDays } from "date-fns";
import useRecentStays from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import Stats from "./Stats";
import TodayBookings from "./TodayBookings";
import StaySummary from "./StaySummary";
import { useEffect } from "react";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: auto 33.8rem auto;
	gap: 2rem;
`;

function DashboardLayout() {
	const [searchParams] = useSearchParams({ last: 7 });

	const numDays = +searchParams.get("last");

	let formattedDate;
	try {
		formattedDate = formatISO(subDays(new Date(), numDays));
	} catch (error) {
		// Set a default date if the formatting fails
		formattedDate = formatISO(subDays(new Date(), 7));
	}

	// Recent bookings
	const {
		data: { data: recentBookings },
		bookingsError,
		isLoadingBookings,
	} = useRecentBookings(formattedDate, numDays);

	// Recent stays
	const {
		data: { data: recentStays },
		staysError,
		isLoadingStays,
	} = useRecentStays(formattedDate, numDays);

	// Cabins
	const {
		cabins,
		error: cabinsError,
		isLoading: isLoadingCabins,
	} = useCabins();

	const isLoading = isLoadingBookings || isLoadingStays || isLoadingCabins;
	const error = bookingsError || staysError || cabinsError;

	// Early returns
	if (isLoading) return <MainSpinner />;

	if (error) throw Error(error.message);

	return (
		<StyledDashboardLayout>
			<Stats
				recentBookings={recentBookings}
				numDays={numDays}
				cabinsCount={cabins.length}
				recentStays={recentStays}
			/>

			<TodayBookings />

			<StaySummary stays={recentStays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
