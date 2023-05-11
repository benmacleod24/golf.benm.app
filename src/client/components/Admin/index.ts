import CreateAnnouncement from "./CreateAnnouncement";
import CreateNewRound from "./CreateNewRound";
import CreatePlayer from "./CreatePlayer";
import CreateTeam from "./CreateTeam";
import ResetPin from "./ResetPin";
import AdminSection from "./Section";

export const Admin = {
	Section: AdminSection,
	CreatePlayer: CreatePlayer,
	CreateTeam: CreateTeam,
	NewRound: CreateNewRound,
	PostAnnouncement: CreateAnnouncement,
	ResetPin: ResetPin,
};
