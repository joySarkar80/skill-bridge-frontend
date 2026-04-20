import Navbar from "@/src/components/shared/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-4 px-[60px] pt-1">{children}</div>
        </div>
    )
}

export default CommonLayout;