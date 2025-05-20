
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar-shadcn"
import { User } from "lucide-react"

const Account = ({ session }) => {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const { toast } = useToast()

    useEffect(() => {
        getProfile()
    }, [session])

    const getProfile = async () => {
        try {
            setLoading(true)
            const user = session?.user

            if (!user) {
                throw new Error("No user on the session")
            }

            // First check if profiles table exists
            const { error: tableCheckError } = await supabase
                .from('profiles')
                .select('*')
                .limit(1)
                .single()

            // If table exists, get user profile
            if (!tableCheckError || tableCheckError.code !== "PGRST116") {
                let { data, error } = await supabase
                    .from('profiles')
                    .select(`username, website, avatar_url`)
                    .eq('id', user.id)
                    .single()

                if (data) {
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                }
            } else {
                // If table doesn't exist, use user metadata
                setUsername(user.user_metadata?.username || user.email)
            }
        } catch (error) {
            console.error("Error loading user profile:", error)
            toast({
                title: "Error loading profile",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const user = session?.user

            if (!user) {
                throw new Error("No user on the session")
            }

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date()
            }

            // First check if profiles table exists
            const { error: tableCheckError } = await supabase
                .from('profiles')
                .select('*')
                .limit(1)
                .single()

            if (!tableCheckError || tableCheckError.code !== "PGRST116") {
                let { error } = await supabase.from("profiles")
                    .upsert(updates, { returning: 'minimal' })

                if (error) {
                    throw error
                }

                toast({
                    title: "Success",
                    description: "Profile updated successfully!"
                })
            } else {
                // If profiles table doesn't exist, update user metadata
                const { error } = await supabase.auth.updateUser({
                    data: { username, website }
                })

                if (error) {
                    throw error
                }

                toast({
                    title: "Success",
                    description: "Profile updated successfully!"
                })
            }
        } catch (error) {
            toast({
                title: "Error updating profile",
                description: error.message,
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div aria-live="polite" className='container mx-auto'>
            {loading ? (
                'Loading profile...'
            ) : (
                <form onSubmit={updateProfile} className="form-widget">
                    <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24">
                            {avatar_url ? (
                                <AvatarImage src={avatar_url} alt="User avatar" />
                            ) : (
                                <AvatarFallback>
                                    <User size={48} />
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>
                    <div className="text-center mb-4">
                        <p>Email: {session.user.email}</p>
                    </div>
                    <div className="container mx-auto w-72 py-4">
                        <input type="text"
                            name="text"
                            id="username"
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="Your Name"
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="container mx-auto w-72 py-4">
                        <input type="text"
                            name="text"
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="your@website.com"
                            id="website"
                            value={website || ''}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div className='text-center'>
                        <button className="w-44 h-11 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                            Update Profile
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="w-44 h-11 rounded-full text-gray-50 bg-red-600 hover:bg-red-700"
                            onClick={() => supabase.auth.signOut()}
                        >
                            Sign Out
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Account;
