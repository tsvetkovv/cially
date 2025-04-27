import { Button } from "@/components/ui/button";

export default function GuildNotFound() {
	return (
		<>
			<div className="text-center mt-20 sm:mt-8 text-5xl font-extrabold mx-10">
				Guild not Found
			</div>
			<div className="w-[30vh] sm:w-[70vh] place-self-center">
				<img src="/404.svg"></img>
			</div>
			<div className="place-self-center">
				<a href="/">
					<Button variant="secondary" className=" mt-2 sm:-mt-4 ">
						Search for another guild...
					</Button>
				</a>
			</div>
		</>
	);
}
