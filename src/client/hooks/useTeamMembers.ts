import { Team_Member } from "@prisma/client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { response } from "~/server/helpers";

export const useTeamMembers = () =>
	useSWR<ReturnType<typeof response<Team_Member[]>>>("/api/v1/players");
