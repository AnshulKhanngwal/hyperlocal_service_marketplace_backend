import { db } from '../src/prisma/db.ts';
import { calculateDistance } from '../utils/distanceUtitlity.js';

export async function createService(req, res) {
    const user = req.user;
    const { category, description } = req.body;
    try {
        const newService = await db.orm.public.Service.create({
            providerId: user.id,
            category: category,
            description: description,
            reviews_values: 5,
            total_reviews: 1,
        });
        res.status(201).json({
            message: 'Created Successfully',
            data: newService,
        });
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            message: 'Something went wrong.',
            error: error,
        });
    }
}

export async function updateService(req, res) {
    const serviceId = req.id;
    const { description } = req.body;
    try {
        const service = await db.orm.public.Service.where({
            id: serviceId,
        }).update({
            description: description,
        });
        const updatedService = await db.orm.public.Service.where({
            id: serviceId,
        }).first();
        res.status(200).json({
            message: 'Service Updated.',
            data: updatedService,
        });
    } catch (error) {
        console.error('Error creating provider:', error);
        res.status(400).json({
            message: 'Something went wrong.',
            error: error,
        });
    }
}

export async function getServices(req, res) {
    const user = req.user;
    const { category } = req.query;
    try {
        let services;
        if (user.role === 'ADMIN' || user.role === 'CUSTOMER') {
            if (user.role === 'CUSTOMER') {
                const customerId = user.id;
                // Get customer's location
                const customer = await db.orm.public.User.where({
                    id: customerId,
                }).first();

                if (!customer) {
                    return res.status(404).json({
                        success: false,
                        message: 'Customer not found',
                    });
                }

                // Customer must have location
                if (customer.lat == null || customer.long == null) {
                    return res.status(400).json({
                        success: false,
                        message:
                            'Customer location is not available. Please login again.',
                    });
                }

                // Get all services with provider
                const allServices =
                    await db.orm.public.Service.include('provider').all();

                // Calculate distance for every service
                const servicesWithDistance = allServices
                    .map((service) => {
                        const provider = service.provider;
                        // Provider doesn't have location
                        if (
                            !provider ||
                            provider.lat == null ||
                            provider.long == null
                        ) {
                            return {
                                ...service,
                                distance: null,
                            };
                        }

                        const distance = calculateDistance(
                            Number(customer.lat),
                            Number(customer.long),
                            Number(provider.lat),
                            Number(provider.long)
                        );

                        return {
                            ...service,
                            distance: Number(distance.toFixed(2)),
                        };
                    })

                    // Sort nearest → farthest
                    .sort((a, b) => {
                        // Services without location go to the end
                        if (a.distance === null) return 1;
                        if (b.distance === null) return -1;

                        return a.distance - b.distance;
                    });
                services = servicesWithDistance;
                // return res.status(200).json({
                //     success: true,
                //     services: servicesWithDistance
                // });
            } else {
                if (category && category !== 'ALL') {
                    services = await db.orm.public.Service.where({
                        category: category,
                    })
                        .include('provider')
                        .all();
                } else {
                    services =
                        await db.orm.public.Service.include('provider').all();
                }
            }
        } else if (user.role === 'SERVICE_PROVIDER') {
            if (category && category !== 'ALL') {
                services = await db.orm.public.Service.where({
                    providerId: user.id,
                })
                    .where({ category: category })
                    .include('provider')
                    .all();
            } else {
                services = await db.orm.public.Service.where({
                    providerId: user.id,
                })
                    .include('provider')
                    .all();
            }
        }
        return res.status(200).json({
            msg: 'Success',
            data: services,
        });
    } catch (error) {
        console.error('Error creating provider:', error);
        return res.status(400).json({
            message: 'Something went wrong.',
            error: error,
        });
    }
}

export async function addRating(req, res) {
    const { serviceId, rating } = req.body;
    try {
        const service = await db.orm.public.Service.where({
            id: serviceId,
        }).first();
        if (!service) {
            res.status(404).json({
                message: 'Service Not Found.',
            });
        }
        const updateService = await db.orm.public.Service.where({
            id: serviceId,
        }).update({
            reviews_values: (service.reviews_values ?? 0) + rating,
            total_reviews: (service.total_reviews ?? 0) + 1,
        });
        res.status(200).json({
            message: 'Rating marked.',
        });
    } catch (error) {
        console.log('error in addRating', error);
        res.status(400).json({
            message: 'Something went wrong.',
            error: error,
        });
    }
}
