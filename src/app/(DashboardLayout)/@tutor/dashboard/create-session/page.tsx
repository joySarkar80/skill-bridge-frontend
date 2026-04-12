// import CreateSessionForm from "@/src/components/dashboard/CreateSessionForm";

// const CreateSessionPage = () => {
//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-6">Create Session</h1>
//             <CreateSessionForm />
//         </div>
//     );
// };

// export default CreateSessionPage;


import CreateSessionForm from "@/src/components/dashboard/CreateSessionForm";

export default function CreateSessionPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                Create Session
            </h1>
            <CreateSessionForm />
        </div>
    );
}