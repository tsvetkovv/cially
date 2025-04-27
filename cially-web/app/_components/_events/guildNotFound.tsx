import { Button } from "@/components/ui/button";

export default function GuildNotFound() {
	return (
		<>
			<div className="mx-10 mt-20 text-center font-extrabold text-5xl sm:mt-8">
				Guild not Found
			</div>
			<div className="w-[30vh] place-self-center sm:w-[70vh]">
				<img src="/404.svg"></img>
			</div>
			<div className="place-self-center">
				<a href="/">
					<Button variant="secondary" className=" sm:-mt-4 mt-2 ">
						Search for another guild...
					</Button>
				</a>
			</div>
		</>
	);
}
