export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const toRadians = (degree) => degree * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export async function getNearestProviders(user) {
    try {
        const userId = user.id;

        // Get customer's location
        const user = await db.orm.public.User.where({ id: userId }).first();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (user.lat == null || user.long == null) {
            return res.status(400).json({
                success: false,
                message: 'Your location is not available',
            });
        }

        // Get all service providers
        const providers = await db.orm.public.User.where({
            role: 'SERVICE_PROVIDER',
            is_active: true,
        }).all();

        // Calculate distance for every provider
        const providersWithDistance = providers
            .map((provider) => {
                // Skip providers without location
                if (provider.lat == null || provider.long == null) {
                    return {
                        ...provider,
                        distance: null,
                    };
                }

                const distance = calculateDistance(
                    Number(user.lat),
                    Number(user.long),
                    Number(provider.lat),
                    Number(provider.long)
                );

                return {
                    ...provider,
                    distance,
                };
            })

            // Providers without location go to the end
            .sort((a, b) => {
                if (a.distance === null) return 1;
                if (b.distance === null) return -1;

                return a.distance - b.distance;
            });

        return {
            success: true,
            providers: providersWithDistance,
        };
    } catch (error) {
        console.error('Error fetching nearest providers:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to fetch providers',
        });
    }
}
