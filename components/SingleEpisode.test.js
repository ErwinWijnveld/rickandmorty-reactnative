import { create } from "react-test-renderer";
import SingleEpisode from "./SingleEpisode";

describe("SingleEpisode", () => {
    it("renders correctly with missing props", () => {
        const props = {
            name: "Test",
            air_date: "2020-01-01",
        }
        const tree = create(
            <SingleEpisode
                {...props}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

