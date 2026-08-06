"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  Download,
  ShieldCheck,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">

              🚀 India's Smart Lead Marketplace

            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">

              Buy High Quality

              <span className="text-blue-600">
                {" "}Business Leads
              </span>

              <br />

              In Just One Click.

            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">

              Purchase verified Instagram, Facebook,
              Snapchat, YouTube and other platform leads.
              Secure payment, instant download and premium quality.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/browse-leads"
                className="border border-gray-300 hover:border-blue-600 px-8 py-4 rounded-xl font-semibold"
              >
                Browse Leads
              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-5 mt-14">

              <div>

                <h2 className="text-3xl font-bold text-blue-600">
                  50K+
                </h2>

                <p className="text-gray-500 mt-2">
                  Verified Leads
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-blue-600">
                  10K+
                </h2>

                <p className="text-gray-500 mt-2">
                  Happy Clients
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-blue-600">
                  100%
                </h2>

                <p className="text-gray-500 mt-2">
                  Secure Payment
                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <div className="bg-white rounded-3xl shadow-2xl border p-8">

              <h3 className="text-2xl font-bold mb-8">

                Popular Platforms

              </h3>

              <div className="space-y-5">

                <div className="flex justify-between items-center border rounded-2xl p-5">

                  <div className="flex items-center gap-4">

                    <FaInstagram className="text-pink-600" />

                    <div>

                      <h4 className="font-semibold">
                        Instagram Leads
                      </h4>

                      <p className="text-sm text-gray-500">
                        25,000 Available
                      </p>

                    </div>

                  </div>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Buy
                  </button>

                </div>

                <div className="flex justify-between items-center border rounded-2xl p-5">

                  <div className="flex items-center gap-4">

                    <FaFacebook className="text-blue-600" />

                    <div>

                      <h4 className="font-semibold">
                        Facebook Leads
                      </h4>

                      <p className="text-sm text-gray-500">
                        18,500 Available
                      </p>

                    </div>

                  </div>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Buy
                  </button>

                </div>

                <div className="flex justify-between items-center border rounded-2xl p-5">

                  <div className="flex items-center gap-4">

                    <FaYoutube className="text-red-600" />

                    <div>

                      <h4 className="font-semibold">
                        YouTube Leads
                      </h4>

                      <p className="text-sm text-gray-500">
                        12,800 Available
                      </p>

                    </div>

                  </div>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Buy
                  </button>

                </div>

              </div>

            </div>

            {/* Floating Cards */}

            <div className="hidden lg:flex absolute -left-12 top-10 bg-white shadow-xl rounded-2xl px-5 py-4 items-center gap-3">

              <Users className="text-blue-600" />

              <div>

                <h4 className="font-bold">
                  10,000+
                </h4>

                <p className="text-sm text-gray-500">
                  Active Users
                </p>

              </div>

            </div>

            <div className="hidden lg:flex absolute -right-10 bottom-10 bg-white shadow-xl rounded-2xl px-5 py-4 items-center gap-3">

              <Download className="text-green-600" />

              <div>

                <h4 className="font-bold">
                  Instant Download
                </h4>

                <p className="text-sm text-gray-500">
                  CSV / Excel
                </p>

              </div>

            </div>

            <div className="hidden lg:flex absolute right-20 -top-8 bg-white shadow-xl rounded-2xl px-5 py-4 items-center gap-3">

              <ShieldCheck className="text-emerald-600" />

              <div>

                <h4 className="font-bold">
                  Secure
                </h4>

                <p className="text-sm text-gray-500">
                  Trusted Payments
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}