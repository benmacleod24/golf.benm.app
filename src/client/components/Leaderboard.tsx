import React, { useState, useEffect } from "react";
import { Admin } from "./Admin";

interface LeaderboardProps {}

/**
 * @description Leaderboard Root Component
 * @return {React.FC<Leaderboard>}
 */
const Leaderboard: React.FC<LeaderboardProps> = (props) => {
	return (
		<Admin.Section title="Leaderboard" theme="brand.700"></Admin.Section>
	);
};

export default Leaderboard;
