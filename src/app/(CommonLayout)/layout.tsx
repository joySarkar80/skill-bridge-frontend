import Navbar from "@/src/components/shared/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-15">{children}</div>
        </div>
    )
}

export default CommonLayout;