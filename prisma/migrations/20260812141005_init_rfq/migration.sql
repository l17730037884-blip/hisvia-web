-- CreateTable
CREATE TABLE "rfqs" (
    "id" UUID NOT NULL,
    "public_ref" TEXT NOT NULL,
    "idempotency_key" TEXT NOT NULL,
    "buyer_name" TEXT,
    "buyer_email" TEXT NOT NULL,
    "requirement_text" TEXT NOT NULL,
    "capability_selection" JSONB,
    "material_application" JSONB,
    "evidence_snapshot" JSONB,
    "factory_cluster_snapshot" JSONB,
    "status" TEXT NOT NULL DEFAULT 'new',
    "internal_status" TEXT NOT NULL DEFAULT 'received',
    "assigned_to" TEXT,
    "source_locale" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rfqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rfq_events" (
    "id" UUID NOT NULL,
    "rfq_id" UUID NOT NULL,
    "event_type" TEXT NOT NULL,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rfq_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rfqs_public_ref_key" ON "rfqs"("public_ref");

-- CreateIndex
CREATE UNIQUE INDEX "rfqs_idempotency_key_key" ON "rfqs"("idempotency_key");

-- CreateIndex
CREATE INDEX "rfq_events_rfq_id_idx" ON "rfq_events"("rfq_id");

-- AddForeignKey
ALTER TABLE "rfq_events" ADD CONSTRAINT "rfq_events_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "rfqs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
