import React, { useState, useEffect } from "react";
import { Admin } from "..";

interface ResetPinProps {}

/**
 * @description Rest Pin Component
 * @return {React.FC<ResetPin>}
 */
const ResetPin: React.FC<ResetPinProps> = (props) => {
	return <Admin.Section title="Reset Golfer Pin"></Admin.Section>;
};

export default ResetPin;
