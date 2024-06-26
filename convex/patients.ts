import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getPatient = query({
    args: { _id: v.any() },
    handler: async (ctx, args) => {
        const patient = await ctx.db.query("patients")
        .filter((q) => q.eq(q.field("_id"), args._id))
        .collect();
        return patient;
        },
    });

export const getPatients = query({
    args: {},
    handler: async (ctx) => {
        const patients = await ctx.db.query("patients").collect();
        return patients;
    },
    });

export const createPatient = mutation({
    args: { name: v.string(), dateOfBirth: v.string(), email: v.string(), phone: v.string(), maritalStatus: v.string(), identificationNumber: v.string(), gender: v.string(), homeAddress: v.string(), city: v.string(), state: v.string(), country: v.string() },
    handler: async (ctx, args) => {
        const { name, dateOfBirth, email, phone, maritalStatus, identificationNumber, gender, homeAddress, city, state, country } = args;
        const patientId = await ctx.db.insert("patients", {
            name,
            dateOfBirth,
            email,
            phone,
            maritalStatus,
            identificationNumber,
            gender,
            homeAddress,
            city,
            state,
            country,
        });
        return patientId;
    },
});

export const updatePatient = mutation({
    args: { id: v.id("patients"), name: v.string(), dateOfBirth: v.string(), email: v.string(), phone: v.string(), maritalStatus: v.string(), identificationNumber: v.string(), gender: v.string(), homeAddress: v.string(), city: v.string(), state: v.string(), country: v.string(), relationship: v.string()},
    handler: async (ctx, args) => {
        const { id, name, dateOfBirth, email, phone, maritalStatus, identificationNumber, gender, homeAddress, city, state, country, relationship } = args;
        await ctx.db.patch(id, {
            name,
            dateOfBirth,
            email,
            phone,
            maritalStatus,
            identificationNumber,
            gender,
            homeAddress,
            city,
            state,
            country,
        })
    }
});

export const deletePatient = mutation({
    args: { id: v.id("patients") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});

export const sendPatientDetails = mutation({
    args: { patientId: v.any(), doctorId: v.any(), patientName: v.string(), dateOfBirth: v.string()},
    handler: async (ctx, args) => {
        const { patientId, patientName, doctorId, dateOfBirth } = args;
        const existingRecord = await ctx.db.query("consultation")
            .filter((q) => q.and(
                q.eq(q.field("patientId"), patientId),
                q.eq(q.field("doctorId"), doctorId)
            ))
            .collect();
        if (existingRecord.length === 0) {
            const details = await ctx.db.insert("consultation", { patientId, doctorId, patientName, dateOfBirth });
            return details;
        }
    },
});
