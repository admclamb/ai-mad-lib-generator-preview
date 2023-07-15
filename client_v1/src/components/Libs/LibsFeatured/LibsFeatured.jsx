import { Link } from "react-router-dom";

const LibsFeatured = () => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-2xl font-semibold">Featured Ad-libs</h3>
        <p className="text-zinc-400">
          View our featured Ad-Libs generated by our users.
        </p>
      </div>

      <ul>
        <li>
          <div className="bg-white text-black p-6 rounded-lg">
            <h6 className="text-xl font-semibold">The Magic Wand...</h6>
            <Link
              to="/"
              className="p-3 rounded bg-zinc-950 text-white inline-block mt-6"
            >
              Go To Ad-Lib
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LibsFeatured;
